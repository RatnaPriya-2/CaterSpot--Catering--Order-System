import { auth, onAuthStateChanged } from "../../firebase.js";

const navbar = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "../../auth/login/login.html";
    } else {
      console.log("User is signed in:", user.uid);
    }
  });

  const navLinks = document.querySelectorAll(".nav-items li");

  navLinks.forEach((link) => {
    link.addEventListener("click", async () => {
      // remove active from all nav links
      navLinks.forEach((item) => item.classList.remove("active"));

      // activate clicked link
      link.classList.add("active");
      let targetPage = link.dataset.target;
      window.location.href = `/user/${targetPage}/${targetPage}.html`;
    });

    let logout = document.querySelector(".logout-btn");
    logout.addEventListener("click", () => {
      auth.signOut();
      window.location.href = "../../auth/login/login.html";
    });
  });
};

export default navbar;
