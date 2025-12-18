import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  arrayUnion,
  query,
  where,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdr_9lH_f8LOG9Y-xo0j8Kb1C0WLzG3XY",
  authDomain: "caterspot-52356.firebaseapp.com",
  projectId: "caterspot-52356",
  storageBucket: "caterspot-52356.firebasestorage.app",
  messagingSenderId: "40001056924",
  appId: "1:40001056924:web:2f1fe59471e11c18a0bd59",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  getDoc,
  doc,
  provider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  signOut,
  getAuth,
  onAuthStateChanged,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  arrayUnion,
  query,
  where,
  serverTimestamp,
};
