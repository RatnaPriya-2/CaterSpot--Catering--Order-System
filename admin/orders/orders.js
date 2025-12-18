import {
  fetchCurrentUser,
  showLoader,
  hideLoader,
  showToast,
  capitalizeFirstLetter,
  toDate,
} from "../../helpers.js";

import {
  doc,
  db,
  getDocs,
  collection,
  getDoc,
  updateDoc,
} from "../../firebase.js";

// Loads and manages all customer orders in admin panel
const orders = async () => {
  console.log("[Orders] Page load started");

  // Page-level DOM references
  const orders = document.querySelector(".orders");
  const ordersContainer = orders.querySelector(".orders-container");
  const loading = orders.querySelector(".loading");

  // Initial UI state
  loading.style.display = "block";
  ordersContainer.style.display = "none";
  ordersContainer.innerHTML = "";

  // Fetch current admin user
  await fetchCurrentUser();
  console.log("[Orders] Admin authenticated");

  // Fetch all orders from Firestore
  console.log("[Orders] Fetching orders");
  const orderSnap = await getDocs(collection(db, "orders"));

  const allOrders = orderSnap.docs.map((order) => ({
    id: order.id,
    ...order.data(),
  }));

  // Fetch customer details for each order
  console.log("[Orders] Fetching customer details");
  const finalCustomerData = {};
  const allUserIds = allOrders.map((order) => order.userId);

  await Promise.all(
    allUserIds.map(async (id) => {
      const userSnap = await getDoc(doc(db, "users", id));
      const userDetails = userSnap.data();

      finalCustomerData[id] = {
        customerId: id,
        customerName: userDetails.fullName,
        customerAddress: userDetails.address,
      };
    })
  );

  // Merge order data with customer details
  const allFinalOrderData = allOrders.map((order) => ({
    ...order,
    userDetails: finalCustomerData[order.userId],
  }));

  // Creates individual order card UI
  const createOrder = (order) => {
    console.log("[Orders] Rendering order:", order.id);

    const { id, createdAt, status, items, userDetails } = order;
    const { customerName, customerAddress } = userDetails;

    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
      <div class="order-top">
        <p class="order-id">Order ID: <span>${id}</span></p>
        <p class="order-date">${toDate(createdAt)}</p>

        <select class="order-status-select">
          <option value="Placed">Placed</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div class="customer-details">
        <p>Customer Name : ${capitalizeFirstLetter(customerName)}</p>
        <p>Address: ${customerAddress}</p>
      </div>

      <div class="items-container">
        ${items
          .map(
            (item) => `
              <div class="order-details">
                <p><strong>Item:</strong> ${item.productName}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Price:</strong> ₹ ${item.price}</p>
              </div>
            `
          )
          .join("")}
      </div>
    `;

    // Handle order status update
    const orderStatus = orderCard.querySelector(".order-status-select");
    orderStatus.value = status;

    orderStatus.addEventListener("change", async (e) => {
      const updatedStatus = e.target.value;
      console.log(`[Orders] Updating status for ${id} → ${updatedStatus}`);

      try {
        await updateDoc(doc(db, "orders", id), {
          status: updatedStatus,
        });
        showToast("Status updated Successfully", "success");
      } catch (error) {
        console.error("[Orders] Status update failed", error);
        showToast(error.message, "error");
      }
    });

    ordersContainer.appendChild(orderCard);
  };

  // Renders all orders on the page
  const renderOrders = () => {
    if (allFinalOrderData.length === 0) {
      console.warn("[Orders] No orders found");
      ordersContainer.innerHTML = `<p>No Orders found...</p>`;
    } else {
      allFinalOrderData.forEach((order) => createOrder(order));
    }

    // Final UI state
    loading.style.display = "none";
    ordersContainer.style.display = "block";
    console.log("[Orders] Page render completed");
  };

  renderOrders();
};

export default orders;
