import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA56UvF6TOhNV6Nq_Z4PrMo2pFRThUZ730",
  authDomain: "churn-crm.firebaseapp.com",
  projectId: "churn-crm",
  storageBucket: "churn-crm.firebasestorage.app",
  messagingSenderId: "353816839116",
  appId: "1:353816839116:web:c3de863b58b819f95b5369",
  measurementId: "G-25JVJVTE6N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();