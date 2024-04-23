// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwv50cf_jPaV0eyoZvuv28qzv9I4gWbfE",
    authDomain: "binote-0218.firebaseapp.com",
    projectId: "binote-0218",
    storageBucket: "binote-0218.appspot.com",
    messagingSenderId: "39515201628",
    appId: "1:39515201628:web:3cafa63e113b125da0c699"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app