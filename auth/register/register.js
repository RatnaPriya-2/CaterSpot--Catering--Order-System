import {
  createUserWithEmailAndPassword,
  auth,
  db,
  doc,
  setDoc,
  serverTimestamp,
} from "../../firebase.js";
import { showLoader, hideLoader, showToast } from "../../helpers.js";

const registerForm = document.getElementById("registerForm");

// get role from URL
const params = new URLSearchParams(window.location.search);
let role = params.get("role");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  showLoader();

  console.log("[REGISTER] Registration started");

  // collect form data
  const formData = new FormData(registerForm);

  // create single address string
  const address =
    formData.get("address") +
    ", " +
    formData.get("city") +
    ", " +
    formData.get("pincode");

  // build data object (exclude address fields)
  const data = {};
  formData.forEach((value, key) => {
    console.log(key);
    if (
      key !== "address" &&
      key !== "city" &&
      key !== "pincode" &&
      key !== "password"
    ) {
      data[key] = value;
    }
  });

  console.log(data);
  // basic role validation
  if (!role) {
    showToast("Role not specified, Register from home page", "error");
    hideLoader();
    window.location.href = "../../index.html";
    console.warn("[REGISTER] Role not specified, aborting registration");
  }

  try {
    // create auth user
    const newUser = await createUserWithEmailAndPassword(
      auth,
      data.email,
      formData.get("password")
    );

    const user = newUser.user;
    console.log("[REGISTER] Auth user created:", user.uid);

    // save user profile
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      ...data,
      role,
      address,
      createdAt: serverTimestamp(),
      cart: [],
    });

    console.log("[REGISTER] User document created");

    hideLoader();
    showToast("User registered successfully!", "success");
    registerForm.reset();
    setTimeout(() => {
      window.location.href = "../../auth/login/login.html";
    }, 1500);
  } catch (error) {
    hideLoader();
    showToast(error.message, "error");
    console.error("[REGISTER ERROR]", error.code, error.message);
  }
});
