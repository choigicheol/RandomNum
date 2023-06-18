import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// const API_KEY = "AIzaSyDxvft-OuaVjeJxIh0ua0ALL_M5xgaVsq4";
// const AUTH_DOMAIN = "random-num-cb37e.firebaseapp.com";
// const PROJECT_ID = "random-num-cb37e";
// const STORAGE_BUCKET = "random-num-cb37e.appspot.com";
// const MESSAGING_SENDER_ID = "619146524958";
// const APP_ID = "1:619146524958:web:0c348cbdd77260e6e9f10f";
// const MEASUREMENT_ID = "G-RV53F2Y0LW";
// const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
// const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
// const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
// const STORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
// const MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;
// const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
// const MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;
// firebase sdk에서 안내한 firebaseConfig 붙여넣기
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

let app = initializeApp(firebaseConfig);
let db = getFirestore(app);

export default db;
