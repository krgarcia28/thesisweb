import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from "./firebase-config.js"; // Ensure this is correctly configured

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("signin-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                alert("❌ Please enter both email and password.");
                return;
            }

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("✅ User signed in:", userCredential.user);
                alert("Login successful!");
                window.location.href = "/user"; // Redirect to dashboard
            } catch (error) {
                console.error("❌ Login Error:", error);
                alert("❌ " + error.message);
            }
        });
    } else {
        console.error("❌ loginForm not found in the DOM");
    }
});
