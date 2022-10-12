import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCsqjGU5P3jGZjO6r9a6ccsp8qUjAONynE",
  authDomain: "budgetapp-348ca.firebaseapp.com",
  projectId: "budgetapp-348ca",
  storageBucket: "budgetapp-348ca.appspot.com",
  messagingSenderId: "185000250117",
  appId: "1:185000250117:web:a28830f7685b79a2fa056c",
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  doc,
  setDoc,
  sendPasswordResetEmail,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
};
