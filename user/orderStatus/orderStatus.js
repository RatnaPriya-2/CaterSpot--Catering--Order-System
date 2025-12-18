import navbar from "../../assets/js/navbar.js";

navbar();

let homeBtn = document.querySelector(".btn-home");

homeBtn.addEventListener("click", () => {
  window.location.href = "/user/home/home.html";
});
