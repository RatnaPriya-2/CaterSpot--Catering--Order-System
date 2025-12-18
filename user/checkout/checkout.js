import navbar from "../../assets/js/navbar.js";

import {
  fetchCurrentUser,
  showLoader,
  hideLoader,
  showToast,
} from "../../helpers.js";
import {
  db,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "../../firebase.js";

//DOM refs

const deliveryAddress = document.querySelector(".delivery-address");
const orderContainer = document.querySelector(".order-container");
const total = document.querySelector(".total");
const placeOrderBtn = document.querySelector(".btn-place-order");
let deliveryFee = 50;

let loading = document.querySelector(".loading");
let checkoutPage = document.querySelector(".checkout-page");

navbar();
const user = await fetchCurrentUser();

//fetch user details

const fetchCartDetails = async () => {
  const userRef = doc(db, "users", user.uid);

  const userSnap = await getDoc(userRef);
  const userAddress = userSnap.data().address;

  deliveryAddress.innerText = userAddress;

  //fetch cart

  const allCartProducts = userSnap.data().cart || [];

  //fetch all cart product details

  const allProductDetails = (
    await Promise.all(
      allCartProducts.map(async (item) => {
        const docRef = doc(db, "products", item.productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;

        return {
          id: item.productId,
          details: { ...docSnap.data() },
          quantity: item.quantity,
        };
      })
    )
  ).filter(Boolean);
  return allProductDetails;
};

const createOrderItem = (item) => {
  let { productName, productPrice } = item.details;
  let { quantity } = item;

  const card = document.createElement("div");
  card.classList.add("order-item");
  card.innerHTML = `
  <p class="item-name">${productName}</p>
              <p class="item-quantity">Qty: ${quantity}</p>
              <p class="item-price">₹ ${productPrice * quantity}</p>`;

  orderContainer.appendChild(card);
};

const allCartItems = await fetchCartDetails();
console.log(allCartItems);

allCartItems.forEach((item) => createOrderItem(item));
loading.classList.add("hidden");
checkoutPage.classList.remove("hidden");

let calculateTotal = allCartItems.reduce(
  (acc, val) => acc + val.details.productPrice * val.quantity,
  0
);

total.innerText = "₹" + " " + (calculateTotal + deliveryFee);

const placeOrder = async () => {
  const allCartItems = await fetchCartDetails();

  let outOfStockItem = allCartItems.find(
    (item) => item.details.remainingStock < item.quantity
  );

  if (outOfStockItem) {
    showToast(
      `${outOfStockItem.details.productName} has insufficient stock `,
      "error"
    );
    return;
  }

  showLoader();
  let order = {}; //array of objects
  let calculateTotal = allCartItems.reduce(
    (acc, val) => acc + val.details.productPrice * val.quantity,
    0
  );

  order.userId = user.uid;
  order.items = allCartItems.map((item) => ({
    productId: item.id,
    productName: item.details.productName,
    price: item.details.productPrice,
    quantity: item.quantity,
  }));

  order.subTotal = calculateTotal;
  order.deliveryFee = deliveryFee;
  order.totalAmount = calculateTotal + deliveryFee;

  order.status = "Placed";

  order.payment = { method: "COD", status: "pending" };

  order.createdAt = serverTimestamp();

  // create irder in firestore

  try {
    let orderId = crypto.randomUUID();
    const orderRef = doc(db, "orders", orderId);
    const userRef = doc(db, "users", user.uid);

    await setDoc(orderRef, order);
    await updateDoc(userRef, { cart: [] });

    for (let item of allCartItems) {
      const productRef = doc(db, "products", item.id);
      const newRemainingStock =
        Number(item.details.remainingStock) - Number(item.quantity);
      console.log(
        `[STOCK] Updating ${item.details.productName}:`,
        newRemainingStock
      );

      await updateDoc(productRef, { remainingStock: newRemainingStock });
    }

    hideLoader();
    showToast("Order placed Successfully", "success");
    setTimeout(() => {
      window.location.href = "/user/orderStatus/orderStatus.html";
    }, 1000);
  } catch (error) {
    hideLoader();
    showToast(error.message, "error");
  }
};
placeOrderBtn.addEventListener("click", placeOrder);
