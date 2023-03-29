// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { FIREBASE_API_KEY } from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "yosbrix-app.firebaseapp.com",
  databaseURL:
    "https://yosbrix-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yosbrix-app",
  storageBucket: "yosbrix-app.appspot.com",
  messagingSenderId: "275008910733",
  appId: "1:275008910733:web:c4315bffa1aa93abd239c4",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const rtdb = firebase.database();

export { auth, db, rtdb };
