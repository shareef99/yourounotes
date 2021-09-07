import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyCdNLyy2P8YVXV_9ZtKMMFZiWDJmmsKh7M",
    authDomain: "onlineounotes.firebaseapp.com",
    projectId: "onlineounotes",
    storageBucket: "onlineounotes.appspot.com",
    messagingSenderId: "567815505682",
    appId: "1:567815505682:web:54233388f6633d27a3d5cb",
    measurementId: "G-HN50T8CSK6",
};

// Initialize Firebase
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const db = getFirestore();
export const auth = getAuth();

export default firebaseConfig;
