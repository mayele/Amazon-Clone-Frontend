// // Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import { getAuth } from "firebase/auth"; //needs it for authentication
// import "firebase/compat/firestore";
// import "firebase/compat/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAsrf8Kn_Z1iKynyfNMvKEzRJIgsDPUGD8",
//   authDomain: "clone-mesgana.firebaseapp.com",
//   projectId: "clone-mesgana",
//   storageBucket: "clone-mesgana.appspot.com",
//   messagingSenderId: "365344301907",
//   appId: "1:365344301907:web:c85bdbfbc1480a54e0b7a6",
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = app.firestore();

//Biruk's firebase
import firebase from "firebase/compat/app"; // Import the compat version of Firebase

import { getAuth } from "firebase/auth";
import "firebase/compat/firestore"; // Import Firestore compat
import "firebase/compat/auth"; // Import Auth compat

// Firebase config
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsrf8Kn_Z1iKynyfNMvKEzRJIgsDPUGD8",
  authDomain: "clone-mesgana.firebaseapp.com",
  projectId: "clone-mesgana",
  storageBucket: "clone-mesgana.appspot.com",
  messagingSenderId: "365344301907",
  appId: "1:365344301907:web:c85bdbfbc1480a54e0b7a6",
};

// Initialize Firebase using the compat version
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app); // Use Firebase compat Auth
export const db = firebase.firestore(); // Use Firebase compat Firestore
