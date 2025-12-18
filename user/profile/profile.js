import { auth, db, getDoc, onAuthStateChanged, doc } from "../../firebase.js";
import { capitalizeFirstLetter } from "../../helpers.js";

import navbar from "../../assets/js/navbar.js";

navbar();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log("User ID:", uid);
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    const userDetails = userSnap.data();
    console.log("User Details:", userDetails);
    let profileFields = document.querySelectorAll("[data-field]");
    console.log(profileFields);
    profileFields.forEach((field) => field.classList.remove("skeleton"));
    profileFields.forEach((field) => {
      const fieldName = field.dataset.field;
      console.log(fieldName)
      if (userDetails[fieldName]) {
        if (fieldName === "createdAt") {
          const date = userDetails[fieldName].toDate();
          field.textContent = date.toLocaleString();
        } else if (fieldName === "fullName") {
          field.textContent = capitalizeFirstLetter(userDetails[fieldName]);
        } else {
          field.textContent = userDetails[fieldName];
        }
      }
    });
  } else {
    console.log("No user is signed in.");
  }
});
