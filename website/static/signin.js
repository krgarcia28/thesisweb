// ✅ Import Firebase modules
import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ signin.js Loaded Successfully!");

    const signinForm = document.getElementById("signin-form");

    if (!signinForm) {
        console.error("⚠️ Sign-in form not found!");
        return;
    }

    signinForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("✅ Sign-in form submitted!");

        const emailInput = document.getElementById("sign-in-email");
        const passwordInput = document.getElementById("signin-password");

        if (!emailInput || !passwordInput) {
            console.error("⚠️ Input fields not found!");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("⚠️ Email and password are required!");
            return;
        }

        try {
            console.log("🚀 Attempting Firebase login...");
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("✅ Firebase login successful!", user.email);

            console.log("🚀 Fetching user role from Flask...");
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            console.log("✅ Flask response:", data);

            if (response.ok) {
                alert("✅ Login successful!");

                if (!data.user || !data.user.role) {
                    console.error("⚠️ Role not received from server!");
                    alert("⚠️ Role not found. Contact admin.");
                    return;
                }

                // ✅ Debugging: Confirm redirect is happening
                if (data.user.role === "user") {
                    console.log("✅ Redirecting to Admin Dashboard...");
                    window.location.href = "/users";
                } else {
                    console.log("✅ Redirecting to User Dashboard...");
                    window.location.href = "/admin";
                }
            } else {
                alert("⚠️ " + data.message);
            }
        } catch (error) {
            console.error("⚠️ Login failed:", error);
            alert("⚠️ Login failed: " + error.message);
        }


        try {
            console.log("🚀 Attempting Firebase login...");
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("✅ Firebase login successful!", user.email);
        } catch (error) {
            console.error("⚠️ Firebase Login Failed:", error.code, error.message);
            alert("⚠️ Error Code: " + error.code + "\nMessage: " + error.message);
        }



    });
});
