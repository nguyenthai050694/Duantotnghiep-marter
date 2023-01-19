// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0Tnry3UHhABWc46iRKXq_Eq79ldDV2LY",
    authDomain: "uploadingfile-32df4.firebaseapp.com",
    projectId: "uploadingfile-32df4",
    storageBucket: "uploadingfile-32df4.appspot.com",
    messagingSenderId: "245905131320",
    appId: "1:245905131320:web:cf0f62d2fe727b065923cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);