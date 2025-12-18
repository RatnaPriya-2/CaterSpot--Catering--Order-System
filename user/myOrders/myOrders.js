import navbar from "../../assets/js/navbar.js";
import { collection, db, getDocs, query, where } from "../../firebase.js";
import {
  fetchCurrentUser,
  capitalizeFirstLetter,
  toDate,
} from "../../helpers.js";

// load navbar
navbar();

// DOM elements
let myOrders = document.querySelector(".my-orders");
let loading = document.querySelector(".loading");

// get logged-in user
let user = await fetchCurrentUser();
console.log("Current user:", user.uid);

// orders collection reference
const orderColl = collection(db, "orders");

// query orders for current user
const q = query(orderColl, where("userId", "==", user.uid));
console.log("Fetching orders...");

const orderData = await getDocs(q);
console.log("Orders fetched:", orderData.size);

// map order documents
let allOrderDetails = orderData.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

console.log("Order details:", allOrderDetails);

// create single order card
const createOrderCard = (order) => {
  let { id, items, deliveryFee, status, createdAt, totalAmount } = order;

  console.log("Rendering order:", id);

  const orderCard = document.createElement("div");
  orderCard.classList.add("order-card");

  orderCard.innerHTML = `
    <div class="order-header">
      <span class="order-id">OrderId : <span>${id}</span></span>
      <span class="order-date">Placed on : ${toDate(createdAt)}</span>
      <span class="order-status ${status}">
        ${capitalizeFirstLetter(status)}
      </span>
    </div>

    <div class="order-body">
      ${items
        .map(
          (item) => `
          <div class="order-item">
            <span>${item.productName} × ${item.quantity}</span>
            <span>₹ ${item.price}</span>
          </div>`
        )
        .join("")}
      <div class="order-delivery">
      <p>Delivery Fee:</p>
      <p>₹ ${deliveryFee}</p>
      </div>
    </div>

    <div class="order-footer">
         <p>Total:</p>
      <p>₹ ${totalAmount}</p>
    </div>
  `;

  myOrders.appendChild(orderCard);
};

// render all orders
const renderOrders = () => {
  console.log("Rendering orders UI");

  loading.classList.add("hidden");
  myOrders.classList.remove("hidden");

  if (allOrderDetails.length === 0) {
    console.log("No orders found");
    myOrders.innerHTML = "<p>No orders found</p>";
    return;
  }

  allOrderDetails.forEach((order) => createOrderCard(order));
};

// start rendering
renderOrders();
