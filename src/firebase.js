// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore,doc,setDoc} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyC9GS6h5z9KJyHdk3-WFtHdZDDSWZoxbQw",
    authDomain: "login-signup-d2f7a.firebaseapp.com",
    projectId: "login-signup-d2f7a",
    storageBucket: "login-signup-d2f7a.appspot.com",
    messagingSenderId: "365783937500",
    appId: "1:365783937500:web:3d687e56bfaf9d97dc5f19",
    measurementId: "G-3C2KQDL8DQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};
