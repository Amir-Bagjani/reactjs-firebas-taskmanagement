import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2lmmLDPLhcQ9RZQDiAc-K6r59SCTsb-I",
  authDomain: "taskmanagement-a5c51.firebaseapp.com",
  projectId: "taskmanagement-a5c51",
  storageBucket: "taskmanagement-a5c51.appspot.com",
  messagingSenderId: "312891505509",
  appId: "1:312891505509:web:1374be95e58909962e3f8c"
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp

export{ projectFirestore, projectAuth, projectStorage, timestamp }