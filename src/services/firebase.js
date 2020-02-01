import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBy--l5odHLE5KK4eTpTS4RBzJsbaIkvC0",
  authDomain: "gitfy-d3bb0.firebaseapp.com",
  databaseURL: "https://gitfy-d3bb0.firebaseio.com",
  projectId: "gitfy-d3bb0",
  storageBucket: "gitfy-d3bb0.appspot.com",
  messagingSenderId: "414562915744",
  appId: "1:414562915744:web:0546976767f554236100c5",
  measurementId: "G-PYY9169XRM"
};

export const app = firebase.initializeApp(config);
export const db = firebase.firestore();
