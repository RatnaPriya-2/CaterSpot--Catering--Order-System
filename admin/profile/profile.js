import { auth, db, getDoc, onAuthStateChanged, doc } from "../../firebase.js";
import { capitalizeFirstLetter } from "../../helpers.js";

// Loads and displays the logged-in user's profile details
const profile = () => {
  console.log("[Profile] Initializing profile page");

  // Listen for authentication state changes
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.warn("[Profile] No user is signed in");
      return;
    }

    try {
      const uid = user.uid;
      console.log("[Profile] User authenticated:", uid);

      // Fetch user data from Firestore
      console.log("[Profile] Fetching user details");
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const userDetails = userSnap.data();

      console.log("[Profile] User details loaded");

      // Remove skeleton loaders
      const profileFields = document.querySelectorAll("[data-field]");
      profileFields.forEach((field) => field.classList.remove("skeleton"));

      // Populate profile fields dynamically
      profileFields.forEach((field) => {
        const fieldName = field.dataset.field;

        if (!userDetails[fieldName]) return;

        if (fieldName === "createdAt") {
          const date = userDetails[fieldName].toDate();
          field.textContent = date.toLocaleString();
        } else if (fieldName === "fullName") {
          field.textContent = capitalizeFirstLetter(userDetails[fieldName]);
        } else {
          field.textContent = userDetails[fieldName];
        }
      });

      console.log("[Profile] Profile rendered successfully");
    } catch (error) {
      console.error("[Profile] Error loading profile data", error);
    }
  });
};

export default profile;
