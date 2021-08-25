import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCdNLyy2P8YVXV_9ZtKMMFZiWDJmmsKh7M",
    authDomain: "onlineounotes.firebaseapp.com",
    projectId: "onlineounotes",
    storageBucket: "onlineounotes.appspot.com",
    messagingSenderId: "567815505682",
    appId: "1:567815505682:web:54233388f6633d27a3d5cb",
    measurementId: "G-HN50T8CSK6",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

firebase.performance();
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
export default firebaseConfig;
