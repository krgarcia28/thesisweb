import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config
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

// Logout function with confirmation
document.querySelector('#logoutBtn').addEventListener("click", async function () {
    const isConfirmed = confirm("Are you sure you want to log out?");
    if (isConfirmed) {
        try {
            const user = auth.currentUser;
            const email = user?.email || "Unknown User";

            // Log the event to Firestore
            await addDoc(collection(db, "systemLogs"), {
                event: "User Logout",
                timestamp: serverTimestamp(),
                user: email,
                details: "User logged out successfully"
            });

            // Sign out the user
            await signOut(auth);
            console.log("✅ User signed out and logout event logged.");
            window.location.href = "/"; // Redirect to home or login
        } catch (error) {
            console.error("⚠️ Error during logout:", error);
        }
    } else {
        console.log("Logout cancelled");
    }
});
