import {
  db,
  getDocs,
  doc,
  collection,
  deleteDoc,
  updateDoc,
  getDoc,
} from "../../firebase.js";
import { showLoader, hideLoader, showToast } from "../../helpers.js";

const menuitems = async () => {
  console.log("[MENU] Admin Menu Items initialized");

  try {
    // category labels
    const categoryMapping = {
      starters: "Starters",
      "main-course": "Main Course",
      desserts: "Desserts",
      beverages: "Beverages",
    };

    // DOM elements
    const menuPage = document.querySelector(".menu-page");
    const menuGrid = menuPage.querySelector(".menu-grid");
    const searchInputBar = document.querySelector(".menu-search-input");
    const menuFilters = document.querySelector(".menu-filters");
    const formModal = document.querySelector(".form-modal");
    const confirmModal = document.querySelector(".confirm-modal");
    const modalActions = formModal.querySelector(".modal-actions");
    const outOfStockBtn = document.querySelector(".out-of-stock-btn");
    const closeBtn = formModal.querySelector(".close-btn");
    const loading = menuPage.querySelector(".loading");

    loading.style.display = "block";
    menuGrid.style.display = "none";

    // fetch all products
    const fetchAllItems = async () => {
      try {
        console.log("[DB] Fetching products");
        let items = [];
        const productsSnap = await getDocs(collection(db, "products"));

        productsSnap.forEach((doc) =>
          items.push({ id: doc.id, ...doc.data() })
        );

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

    // category filter
    menuFilters.addEventListener("click", (e) => {
      if (!e.target.classList.contains("filter-btn")) return;

      menuFilters
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      outOfStockBtn.classList.remove("active");

      e.target.classList.add("active");
      searchCategory = e.target.dataset.category;
      applyFiltersAndRenderItems();
    });

    // search filter
    searchInputBar.addEventListener("input", (e) => {
      searchInput = e.target.value.toLowerCase().trim();
      applyFiltersAndRenderItems();
    });

    // delete product from database
    const deleteItemFromDB = async (itemId) => {
      try {
        await deleteDoc(doc(db, "products", itemId));
        allItems = allItems.filter((item) => item.id !== itemId);
      } catch (error) {
        console.error("[DB ERROR] Delete failed:", error);
        showToast("Failed to delete product", "error");
      }
    };

    // delete confirmation
    const handleDeleteItem = async (itemId) => {
      confirmModal.classList.remove("hidden");

      confirmModal.querySelector(".confirm-actions").onclick = async (e) => {
        if (e.target.id === "confirmYes") {
          showLoader();
          await deleteItemFromDB(itemId);
          hideLoader();
          showToast("Item deleted successfully", "success");
          confirmModal.classList.add("hidden");
          applyFiltersAndRenderItems();
        }

        if (e.target.id === "confirmCancel") {
          confirmModal.classList.add("hidden");
        }
      };
    };

    // populate edit form
    const fetchAndPopulateFormData = (itemId) => {
      const itemData = allItems.find((item) => item.id === itemId);

      const fields = formModal.querySelectorAll("[name]");
      fields.forEach((field) => {
        field.value = itemData[field.name];
      });

      formModal.querySelector("form").dataset.id = itemId;
    };

    closeBtn.addEventListener("click", () => formModal.classList.add("hidden"));

    // update product
    modalActions.addEventListener("click", async (e) => {
      if (e.target.id === "cancelEdit") {
        formModal.classList.add("hidden");
      }

      if (e.target.id === "updateProduct") {
        e.preventDefault();
        showLoader();

        try {
          const form = formModal.querySelector("form");
          const formData = new FormData(form);

          const itemRef = doc(db, "products", form.dataset.id);
          const itemSnap = await getDoc(itemRef);
          const itemDetails = itemSnap.data();

          let oldStock = Number(itemDetails.stockCapacity);
          let remainingStock = Number(itemDetails.remainingStock);

          const difference = oldStock - Number(formData.get("stockCapacity"));

          remainingStock = remainingStock - difference;

          let updatedData = { remainingStock };

          formData.forEach((value, key) => {
            updatedData[key] = value;
          });

          await updateDoc(itemRef, updatedData);

          allItems = allItems.map((item) =>
            item.id === form.dataset.id ? { ...item, ...updatedData } : item
          );

          showToast("Item updated successfully", "success");
          formModal.classList.add("hidden");
          applyFiltersAndRenderItems();
        } catch (error) {
          console.error("[DB ERROR] Update failed:", error);
          showToast("Failed to update product", "error");
        } finally {
          hideLoader();
        }
      }
    });

    // create product card
    const createMenuCard = (item) => {
      const { smallImageUrl, productName, productPrice, id, remainingStock } =
        item;

      const card = document.createElement("div");
      card.className = "admin-product-card";

      card.innerHTML = `
        <div class="product-image">
          <img src="${smallImageUrl}" alt="${productName}" />
        </div>

        <div class="product-info">
          <h3>${productName}</h3>
          <p>${categoryMapping[item.productCategory]} • ₹${productPrice}</p>
          <p>Remaining Stock: <strong>${remainingStock}</strong></p>
          <span class="status ${remainingStock ? "active" : "inactive"}">
            ${remainingStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div class="product-actions">
          <button class="btn edit-btn">Edit</button>
          <button class="btn delete-btn">Delete</button>
        </div>
      `;

      card.querySelector(".product-actions").addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
          formModal.classList.remove("hidden");
          fetchAndPopulateFormData(id);
        }

        if (e.target.classList.contains("delete-btn")) {
          handleDeleteItem(id);
        }
      });

      menuGrid.appendChild(card);
    };

    // apply filters and render items
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
      loading.style.display = "none";
      menuGrid.style.display = "grid";
    };

    // initial render
    applyFiltersAndRenderItems();

    // show out of stock items
    const getAllOutOfStockItems = async () => {
      menuFilters
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));

      const productsSnap = await getDocs(collection(db, "products"));
      const products = productsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const outOfStockProducts = products.filter(
        (item) => item.remainingStock === 0
      );

      menuGrid.innerHTML = "";

      if (outOfStockProducts.length === 0) {
        menuGrid.innerHTML = `<p>No Out of Stock Items found.</p>`;
        return;
      }

      outOfStockProducts.forEach(createMenuCard);
    };

    outOfStockBtn.addEventListener("click", () => {
      outOfStockBtn.classList.add("active");
      getAllOutOfStockItems();
    });
  } catch (error) {
    console.error("[PAGE ERROR] Menu page failed:", error);
    showToast("Something went wrong while loading the page", "error");
  }
};

export default menuitems;
