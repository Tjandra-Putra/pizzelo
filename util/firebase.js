import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_URL,
  authDomain: "pizzelo-d5162.firebaseapp.com",
  projectId: "pizzelo-d5162",
  storageBucket: "pizzelo-d5162.appspot.com",
  messagingSenderId: "145742134137",
  appId: "1:145742134137:web:dbc4419f433d6e30b04da8",
  measurementId: "G-VPXNZZ016T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
