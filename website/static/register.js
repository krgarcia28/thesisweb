
  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
  import { getFirestore,doc, setDoc,addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAOhsviZavR7VXKXHQMfcW95SeohE1QkNI",
    authDomain: "twebapp-77a14.firebaseapp.com",
    projectId: "twebapp-77a14",
    storageBucket: "twebapp-77a14.firebasestorage.app",
    messagingSenderId: "640250469202",
    appId: "1:640250469202:web:0c1e8d94cd8ceb7b06f88b",
    measurementId: "G-8DZ0LLTC2M"
  };


 // ✅ Initialize Firebase FIRST
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Debugging: Check if Firebase is properly initialized
console.log("✅ Firebase Initialized:", app);
console.log("✅ Auth Initialized:", auth);
console.log("✅ Firestore Initialized:", db);

// ✅ Wait for the DOM to Load Before Using Firebase
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector(".sign-up form");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent page reload

        // ✅ Get User Input Values
        const name = document.getElementById("name").value;
        const studentNumber = document.getElementById("studentnumber").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("password").value;


        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!email || !password || !name || !studentNumber) {
            alert("All fields are required!");
            return;
        }

        try {
            // ✅ Fix: Use `auth` directly inside `createUserWithEmailAndPassword`
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("✅ User created:", user);

            // ✅ Store user data in Firestore
            await setDoc(doc(db, "user", user.uid), {
                name: name,
                studentNumber: studentNumber,
                email: email,
                createdAt: new Date(),
                role:"user",
                completedSessions: 0,
                totalPoints: 0,
            });

            alert("✅ Signup successful!");
            window.location.href = "/"; // Redirect after signup
        } catch (error) {
            alert("⚠️ Error: " + error.message);
            console.error("Signup Error:", error);
        }
    });
});