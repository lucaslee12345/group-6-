import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmti6Fzdh97bxAJbU5XO4DAZE1k8Y3B2E",
  authDomain: "doctor-finder-2a4c6.firebaseapp.com",
  projectId: "doctor-finder-2a4c6",
  storageBucket: "doctor-finder-2a4c6.firebasestorage.app",
  messagingSenderId: "277476491962",
  appId: "1:277476491962:web:aa082716189eb4e07ab883",
  measurementId: "G-H6E1E311G4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };