import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA-c1AGaoCiNiZxNeyguhN1xienuEl7aHI",
    authDomain: "yourounotes.firebaseapp.com",
    projectId: "yourounotes",
    storageBucket: "yourounotes.appspot.com",
    messagingSenderId: "1010103316194",
    appId: "1:1010103316194:web:34ca5ba5c7428a789f78bb",
    measurementId: "G-Z7V6N3986H",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const timestamp = firebase.firestore.Timestamp;

export { db, auth, storage, timestamp };
export default firebaseConfig;
