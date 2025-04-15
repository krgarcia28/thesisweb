import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { db, auth } from "./firebase-config.js";

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const email = user.email;
        try {
            const userCollection = collection(db, "user");
            const q = query(userCollection, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();

                    document.getElementById("profile-name").innerText = data.name || "No name";
                    document.getElementById("profile-studentnumber").innerText = data.studentNumber || "N/A";
                    document.getElementById("profile-email").innerText = data.email || email;
                    document.getElementById("profile-points").innerText = data.totalPoints || 0;
                    if (data.avatarUrl) {
                        document.getElementById("profile-avatar").src = data.avatarUrl;
                    }

                    // ✅ Generate QR Code for this user
                    const qrData = `https://your-website.com/trigger_game?uid=${user.uid}`; // Replace with actual game trigger URL
                    const qrCanvas = document.getElementById("qr-code");

                    QRCode.toCanvas(qrCanvas, qrData, function (error) {
                        if (error) console.error("QR Code error:", error);
                        else console.log("✅ QR Code generated!");
                    });
                });
            } else {
                console.warn("⚠️ No user data found for", email);
            }
        } catch (err) {
            console.error("🔥 Failed to load user profile:", err);
        }
    } else {
        console.log("⚠️ No user logged in.");
    }
});
