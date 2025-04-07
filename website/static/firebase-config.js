// firebase-config.js
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAOhsviZavR7VXKXHQMfcW95SeohE1QkNI",
    authDomain: "twebapp-77a14.firebaseapp.com",
    projectId: "twebapp-77a14",
    storageBucket: "twebapp-77a14.firebasestorage.app",
    messagingSenderId: "640250469202",
    appId: "1:640250469202:web:0c1e8d94cd8ceb7b06f88b",
    measurementId: "G-8DZ0LLTC2M"
};

// Avoid re-initialization
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
