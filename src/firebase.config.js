// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';


// use when user successfully => xuoongs exxport db=
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC18Z2yTBwrdBuVnwpnMBpgk-X1jdTvlSM",
  authDomain: "atino-ecommerce.firebaseapp.com",
  projectId: "atino-ecommerce",
  storageBucket: "atino-ecommerce.appspot.com",
  messagingSenderId: "640474901036",
  appId: "1:640474901036:web:02e1af4f1114b1103e3f89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app)
export const storage = getStorage(app) //xong sang file signup import updateProfile va ref


export default app


// xong được ật email pass word xong import { getAuth }
// xong export const auth