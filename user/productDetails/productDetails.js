import navbar from "../../assets/js/navbar.js";
import { arrayUnion, db, doc, getDoc, updateDoc } from "../../firebase.js";
import {
  showLoader,
  hideLoader,
  showToast,
  fetchCurrentUser,
} from "../../helpers.js";

navbar();
const user = await fetchCurrentUser();
console.log(user);
const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
const productDetailsPage = document.querySelector(".product-details-page");

showLoader();
let quantity = 1;

const docRef = doc(db, "products", productId);
const docSnap = await getDoc(docRef);

let productDetails = docSnap.data();
let { productName, productPrice, productDesc, bigImageUrl } = productDetails;

productDetailsPage.innerHTML = `
 <button class="back-btn">Back</button>
          <div class="food-details">
            <div class="food-image">
              <img
                src=${bigImageUrl}
                alt="Food Item"
              />
            </div>

            <div class="food-info">
              <h2 class="food-title">${productName}</h2>
              <p class="food-price">₹ ${productPrice}</p>

              <p class="food-description">
                ${productDesc}
              </p>

              <div class="food-meta">
                <div class="quantity-control">
                  <button class="reduce-quantity">-</button>
                  <span>1</span>
                  <button class="increase-quantity">+</button>
                </div>

                <button class="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          </div>`;

const backBtn = document.querySelector(".back-btn");
backBtn.addEventListener("click", () => {
  window.history.back();
});

const quantityControl = productDetailsPage.querySelector(".quantity-control");
quantityControl.addEventListener("click", (e) => {
  let quantitySpan = quantityControl.querySelector("span");
  if (e.target.classList.contains("increase-quantity")) {
    quantity++;
    quantitySpan.innerText = quantity;
  } else if (e.target.classList.contains("reduce-quantity")) {
    if (quantity > 1) {
      quantity--;
      quantitySpan.innerText = quantity;
    } else {
      quantity = 1;
      showToast("Quantity cannot be less than 1");
    }
  }
});

const addToCartBtn = document.querySelector(".add-to-cart-btn");
addToCartBtn.addEventListener("click", async () => {
  showLoader();
  let data = { productId: productId, quantity: quantity };
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  const userDetails = userSnap.data();
  const findProduct = userDetails.cart.find(
    (item) => item.productId === productId
  );

  if (findProduct) {
    findProduct.quantity += data.quantity;
    let finalCart = userDetails.cart.map((item) =>
      item.id === findProduct.id ? findProduct : item
    );
    await updateDoc(userRef, { cart: finalCart });
    hideLoader();
    showToast(
      `Item already in cart, Quantity increased by ${quantity}`,
      "success"
    );
  } else {
    await updateDoc(userRef, { cart: arrayUnion(data) });
    hideLoader();
    showToast("Item added to cart", "success");
  }
});

hideLoader();
