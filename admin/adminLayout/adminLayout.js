import { auth, onAuthStateChanged } from "../../firebase.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../../auth/login/login.html";
  } else {
    console.log("User is signed in:", user.uid);
  }
});

const navLinks = document.querySelectorAll(".nav-items li");
const sections = document.querySelectorAll("section");

navLinks.forEach((link) => {
  link.addEventListener("click", async () => {
    // remove active from all nav links
    navLinks.forEach((item) => item.classList.remove("active"));

    // hide all sections
    sections.forEach((section) => section.classList.add("hidden"));

    // activate clicked link
    link.classList.add("active");

    // show target section
    const target = link.dataset.target;
    console.log(target);
    const targetSection = document.querySelector(`.${target}`);
    if (!targetSection) return;

    // remove old css
    document.querySelectorAll(".dynamic-css").forEach((css) => css.remove());

    // load new css
    const cssLink = document.createElement("link");
    cssLink.classList.add("dynamic-css");
    cssLink.rel = "stylesheet";
    cssLink.href = `/admin/${target}/${target}.css`;
    document.head.appendChild(cssLink);
    // load html
    const response = await fetch(`/admin/${target}/${target}.html`);
    const html = await response.text();
    targetSection.innerHTML = html;
    targetSection.classList.remove("hidden");

    // dynamically import JS module
    const module = await import(`/admin/${target}/${target}.js`);

    console.log(module);

    // call default exported function
    if (module.default) {
      module.default();
    }
  });
});

let home = document.querySelector(`[data-target="home"]`);
home.click();
let logout = document.querySelector(".logout-btn");
logout.addEventListener("click", () => {
  auth.signOut();
  window.location.href = "../../auth/login/login.html";
});
