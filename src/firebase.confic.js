// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXb-W7MYJccMIjgak4orKk3BPctKeYjLE",
    authDomain: "mahesh-b.firebaseapp.com",
    projectId: "mahesh-b",
    storageBucket: "mahesh-b.appspot.com",
    messagingSenderId: "365600418083",
    appId: "1:365600418083:web:0cd1f27591c7312a980496"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
// export default { app, database };