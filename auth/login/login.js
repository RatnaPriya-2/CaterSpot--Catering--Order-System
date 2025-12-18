import {
  signInWithEmailAndPassword,
  auth,
  db,
  doc,
  getDoc,
} from "../../firebase.js";

import {
  showLoader,
  hideLoader,
  showToast,
  navigateTo,
} from "../../helpers.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  showLoader();

  console.log("[LOGIN] Login started");

  const formData = new FormData(loginForm);

  try {
    // authenticate user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.get("email"),
      formData.get("password")
    );

    const user = userCredential.user;
    console.log("[LOGIN] Auth success:", user.uid);

    // fetch user details
    const userRef = doc(db, "users", user.uid);
    const userDetails = await getDoc(userRef);

    if (!userDetails.exists()) {
      hideLoader();
      showToast("User profile not found", "error");
      console.warn("[LOGIN] Firestore document missing for:", user.uid);
      return;
    }

    const role = userDetails.data().role;
    console.log("[LOGIN] Role detected:", role);

    hideLoader();
    showToast("Login successful!", "success");
    loginForm.reset();

    setTimeout(() => {
      navigateTo(role);
    }, 1500);
  } catch (error) {
    hideLoader();
    showToast(error.message, "error");
    console.error("[LOGIN ERROR]", error.code, error.message);
  }
});
