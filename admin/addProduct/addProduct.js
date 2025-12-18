import {
  serverTimestamp,
  setDoc,
  doc,
  db,
  collection,
  getDocs,
} from "../../firebase.js";

import { showLoader, hideLoader, showToast } from "../../helpers.js";

// Handles adding a new product from the admin panel
const addProduct = () => {
  // Page-level DOM references
  const addProductPage = document.querySelector(".add-product");
  const addProductForm = addProductPage.querySelector(".add-product-form");
  const loading = addProductPage.querySelector(".loading");

  if (!addProductForm) {
    console.warn("[Add Product] Form not found");
    return;
  }

  // Initial UI state
  loading.style.display = "block";
  addProductForm.style.display = "none";

  const submitBtn = addProductForm.querySelector(".submit-btn");

  // Submit handler for adding product
  submitBtn.addEventListener("click", async () => {
    console.log("[Add Product] Submit initiated");
    showLoader();

    const formData = new FormData(addProductForm);

    try {
      // Fetch existing products to prevent duplicates
      console.log("[Add Product] Fetching existing products");
      const productsSnap = await getDocs(collection(db, "products"));

      const allProducts = productsSnap.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      // Normalize product name to handle case & spacing variations
      const normalizedProductName = (name) =>
        name.trim().toLowerCase().replace(/\s+/g, " ");

      const enteredName = normalizedProductName(formData.get("productName"));

      const existingProduct = allProducts.find(
        (item) => normalizedProductName(item.productName) === enteredName
      );

      if (existingProduct) {
        console.warn("[Add Product] Duplicate product detected");
        hideLoader();
        addProductForm.reset();
        showToast("Item already exists");
        return;
      }

      // Prepare product data for Firestore
      const data = {
        id: crypto.randomUUID(),
        createdAt: serverTimestamp(),
        remainingStock: Number(formData.get("stockCapacity")),
      };

      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Save product to Firestore
      console.log("[Add Product] Saving product to database");
      const productRef = doc(db, "products", data.id);
      await setDoc(productRef, data);

      console.log("[Add Product] Product added successfully");
      hideLoader();
      showToast("Product added successfully", "success");
      addProductForm.reset();
    } catch (error) {
      console.error("[Add Product] Error while adding product", error);
      hideLoader();
      showToast(`Error adding product: ${error.code}`, "error");
    }
  });

  // Final UI state after page load
  loading.style.display = "none";
  addProductForm.style.display = "block";
};

export default addProduct;
