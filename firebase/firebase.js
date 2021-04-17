import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCdNLyy2P8YVXV_9ZtKMMFZiWDJmmsKh7M",
    authDomain: "onlineounotes.firebaseapp.com",
    projectId: "onlineounotes",
    storageBucket: "onlineounotes.appspot.com",
    messagingSenderId: "567815505682",
    appId: "1:567815505682:web:54233388f6633d27a3d5cb",
    measurementId: "G-HN50T8CSK6",
    // apiKey: "AIzaSyA-c1AGaoCiNiZxNeyguhN1xienuEl7aHI",
    // authDomain: "yourounotes.firebaseapp.com",
    // projectId: "yourounotes",
    // storageBucket: "yourounotes.appspot.com",
    // messagingSenderId: "1010103316194",
    // appId: "1:1010103316194:web:34ca5ba5c7428a789f78bb",
    // measurementId: "G-Z7V6N3986H",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db };
export default firebaseConfig;
