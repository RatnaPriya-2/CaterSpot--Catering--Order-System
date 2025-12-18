import navbar from "../../assets/js/navbar.js";
import {
  fetchCurrentUser,
  showToast,
  showLoader,
  hideLoader,
} from "../../helpers.js";
import { doc, db, updateDoc, getDoc } from "../../firebase.js";

// dom elements
let cartPage = document.querySelector(".cart-page");
let cartItems = document.querySelector(".cart-items");
let cartSummary = document.querySelector(".cart-summary");

let subTotal = document.querySelector(".sub-total");
let total = document.querySelector(".total");
let loading = document.querySelector(".loading");
// load navbar
navbar();

// get current user
let user = await fetchCurrentUser();
if (!user) {
  console.log("User not logged in");
  window.location.href = "/auth/login/login.html";
}

// get user cart
let allCartProducts = [];
const userRef = doc(db, "users", user.uid);
const userSnap = await getDoc(userRef);
allCartProducts = userSnap.data().cart || [];
console.log("Cart:", allCartProducts);

// create cart item
const createItem = (item) => {
  let { productName, productPrice, smallImageUrl } = item.details;
  let { id, quantity } = item;

  const card = document.createElement("div");
  card.classList.add("cart-item");
  card.id = id;

  card.innerHTML = `
    <img src="${smallImageUrl}" alt="Food" />
    <div class="item-details">
      <h3>${productName}</h3>
      <p class="item-price">₹ ${productPrice * quantity}</p>

      <div class="item-actions">
        <div class="quantity-control">
          <button class="decrease-quantity">-</button>
          <span>${quantity}</span>
          <button class="increase-quantity">+</button>
        </div>
        <button class="remove-btn">Remove</button>
      </div>
    </div>
  `;

  const quantityControl = card.querySelector(".quantity-control");
  const quantitySpan = card.querySelector(".quantity-control span");
  const itemPrice = card.querySelector(".item-price");

  // update quantity
  quantityControl.addEventListener("click", async (e) => {
    let findProduct = allCartProducts.find(
      (product) => product.productId === id
    );
    if (!findProduct) return;

    if (e.target.classList.contains("decrease-quantity")) {
      findProduct.quantity =
        findProduct.quantity > 1 ? findProduct.quantity - 1 : 1;
      await renderCartItems();
    }

    if (e.target.classList.contains("increase-quantity")) {
      findProduct.quantity += 1;
      await renderCartItems();
    }

    quantitySpan.innerText = findProduct.quantity;
    itemPrice.innerText = "₹" + " " + findProduct.quantity * productPrice;

    allCartProducts = allCartProducts.map((product) =>
      product.productId === findProduct.productId ? findProduct : product
    );

    await updateDoc(userRef, { cart: allCartProducts });
    console.log("Quantity updated:", findProduct);
  });

  // remove item
  const removeBtn = card.querySelector(".remove-btn");
  removeBtn.addEventListener("click", async () => {
    showLoader();
    allCartProducts = allCartProducts.filter((item) => item.productId !== id);
    await updateDoc(userRef, { cart: allCartProducts });
    hideLoader();
    showToast("Item removed from cart", "success");
    await renderCartItems();
  });

  cartItems.appendChild(card);
};

// render cart items
const renderCartItems = async () => {
  const allProductDetails = await Promise.all(
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
  );

  cartItems.innerHTML = "";
  loading.classList.add("hidden");
  cartPage.classList.remove("hidden");

  if (allProductDetails.length === 0) {
    cartPage.innerHTML = `<p class="empty">Your cart is empty...</p>`;
    return;
  }

  allProductDetails.forEach((product) => createItem(product));

  let calculateSubTotal = allProductDetails.reduce(
    (acc, val) => acc + val.details.productPrice * val.quantity,
    0
  );

  subTotal.innerText = `₹ ${calculateSubTotal}`;
  let delivery = 50;
  let calculateTotal = calculateSubTotal + delivery;
  total.innerText = `₹ ${calculateTotal}`;
};

// initial load
await renderCartItems();
