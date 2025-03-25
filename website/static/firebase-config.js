// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js"; 
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore,collection,addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Firebase configuration object (Replace with your Firebase project settings)
const firebaseConfig = {
  apiKey: "AIzaSyAOhsviZavR7VXKXHQMfcW95SeohE1QkNI",
  authDomain: "twebapp-77a14.firebaseapp.com",
  projectId: "twebapp-77a14",
  storageBucket: "twebapp-77a14.firebasestorage.app",
  messagingSenderId: "640250469202",
  appId: "1:640250469202:web:0c1e8d94cd8ceb7b06f88b",
  measurementId: "G-8DZ0LLTC2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase services for use in other files
export { app, auth, db,collection,addDoc };
