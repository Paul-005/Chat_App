import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI2Z_jsnX8XurTrTnL_CONCP5CH-aX72g",
  authDomain: "paul-s-chatapp.firebaseapp.com",
  databaseURL: "https://paul-s-chatapp-default-rtdb.firebaseio.com",
  projectId: "paul-s-chatapp",
  storageBucket: "paul-s-chatapp.appspot.com",
  messagingSenderId: "91537495329",
  appId: "1:91537495329:web:2e101410a844957aa5da60",
  measurementId: "G-LRJL739MQB",
};

// Initialize Firebase
try {
  if (firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);
  }
} catch (err) {
  console.log(err);
}
