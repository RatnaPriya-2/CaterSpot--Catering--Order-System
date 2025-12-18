import { db, getDocs, collection } from "../../firebase.js";
import { showLoader, hideLoader, showToast } from "../../helpers.js";
import navbar from "../../assets/js/navbar.js";

// DOM elements

navbar();
let menuPage = document.querySelector(".menu-page");
const menuGrid = document.querySelector(".menu-grid");
const searchInputBar = document.querySelector(".menu-search-input");
const menuFilters = document.querySelector(".menu-filters");

const loading = document.querySelector(".loading");

// fetch all products
const fetchAllItems = async () => {
  try {
    console.log("[DB] Fetching products");
    let items = [];
    const productsColl = collection(db, "products");
    const productsSnap = await getDocs(productsColl);

    productsSnap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));

    console.log(`[DB] ${items.length} products loaded`);
    return items;
  } catch (error) {
    console.error("[DB ERROR] Fetch failed:", error);
    showToast("Failed to load products", "error");
    return [];
  }
};

let allItems = await fetchAllItems();

// filter state
let searchCategory = null;
let searchInput = null;

// category filter click
menuFilters.addEventListener("click", (e) => {
  if (!e.target.classList.contains("filter-btn")) return;

  console.log("[FILTER] Category:", e.target.dataset.category);

  menuFilters
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));

  e.target.classList.add("active");
  searchCategory = e.target.dataset.category;
  applyFiltersAndRenderItems();
});

// search input
searchInputBar.addEventListener("input", (e) => {
  searchInput = e.target.value.toLowerCase().trim();
  console.log("[SEARCH] Query:", searchInput);
  applyFiltersAndRenderItems();
});

// create product card
const createMenuCard = (item) => {
  const { smallImageUrl, productName, productPrice, id, remainingStock } = item;

  console.log(remainingStock);

  const card = document.createElement("div");
  card.className = "admin-product-card";

  card.innerHTML = `
        <div class="product-image">
          <img src="${smallImageUrl}" alt="${productName}" />
        </div>

        <div class="product-info">
          <h3>${productName}</h3>
          <p>₹ ${productPrice}</strong></p>
          <span class="status ${remainingStock ? "active" : "inactive"}">${
    remainingStock ? "In Stock" : "Out of Stock"
  }</span>
        </div>

        <div class="gray-card ${remainingStock ? "hidden" : ""}">
        <p>Out of Stock</p></div>
      `;

  card.addEventListener("click", () => {
    if (!remainingStock) {
      showToast("Porduct is out of stock", "error");
      return;
    }
    window.location.href = `../productDetails/productDetails.html?productId=${id}`;
  });

  menuGrid.appendChild(card);
};

// apply filters and render
const applyFiltersAndRenderItems = () => {
  let filteredItems = [...allItems];

  if (searchCategory && searchCategory !== "all") {
    filteredItems = filteredItems.filter(
      (item) => item.productCategory === searchCategory
    );
  }

  if (searchInput) {
    filteredItems = filteredItems.filter((item) =>
      item.productName.toLowerCase().includes(searchInput)
    );
  }

  menuGrid.innerHTML = "";

  if (filteredItems.length === 0) {
    menuGrid.innerHTML = `<p class="no-results">No items found.</p>`;
    return;
  }

  filteredItems.forEach(createMenuCard);
};

// initial render
applyFiltersAndRenderItems();
