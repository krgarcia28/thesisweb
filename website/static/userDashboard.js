import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { app } from "./firebase-config.js"; 

const auth = getAuth(app);
const db = getFirestore(app); 

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const email = user.email;
    console.log("✅ Logged in user:", email);

    try {
      const userQuery = query(collection(db, "user"), where("email", "==", email));
      const snapshot = await getDocs(userQuery);

      if (snapshot.empty) {
        console.warn("⚠️ No user document found for:", email);
        return;
      }

      snapshot.forEach((doc) => {
        const userData = doc.data();
        console.log("✅ User data from Firestore:", userData);

        document.getElementById("my-points").innerText = userData.totalPoints || 0;
        document.getElementById("total-bottles").innerText = userData.totalBottles || 0;
        document.getElementById("sessions-played").innerText = userData.completedSessions || 0;
      });
    } catch (error) {
      console.error("🔥 Error fetching user stats:", error);
    }

  } else {
    console.warn("⚠️ User is not signed in");
  }
});
