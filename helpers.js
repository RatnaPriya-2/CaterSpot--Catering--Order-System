import { onAuthStateChanged, auth } from "./firebase.js";

// ---------- Loader ----------
const loader = document.getElementById("global-loader");

export function showLoader() {
  console.log(1);
  if (!loader) return;
  console.log(2);
  loader.classList.remove("hidden");
}

export function hideLoader() {
  if (!loader) return;
  loader.classList.add("hidden");
}

// ---------- Toast ----------
const toastContainer = document.getElementById("toast-container");

export function showToast(message, type = "info") {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ---------- Text Utils ----------
export function capitalizeFirstLetter(text) {
  if (!text || typeof text !== "string") return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function navigateTo(role) {
  if (!role) return;
  if (role === "user") {
    window.location.href = `/${role}/home/home.html`;
  } else {
    window.location.href = `../../${role}/${role}Layout/${role}Layout.html`;
  }
}

export function fetchCurrentUser() {
  return new Promise((res, rej) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        res(user);
      } else {
        rej(null);
      }
    });
  });
}

// converts Firestore Timestamp to readable date
export function toDate(date) {
  if (!date) return "";
  return date.toDate().toLocaleDateString();
}

