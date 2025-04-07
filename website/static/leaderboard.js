import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

// Auth State Listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const currentUserEmail = user.email;
    await fetchLeaderboard(currentUserEmail);
  } else {
    console.log("User not logged in.");
    console.log("Checking:", user.email, "vs", currentUserEmail);
  }
});

// Fetch leaderboard
async function fetchLeaderboard(currentUserEmail) {
  const leaderboardBody = document.getElementById("user-leaderboard-body");
  leaderboardBody.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "user"));
    const users = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      users.push({
        name: data.name,
        email: data.email,
        completedSessions: data.completedSessions || 0,
        totalPoints: data.totalPoints || 0,
      });
    });

    // Sort by points
    users.sort((a, b) => b.totalPoints - a.totalPoints);

    const medals = ["🥇", "🥈", "🥉"];

    users.forEach((user, index) => {
      const isCurrent = user.email === currentUserEmail;
      const row = document.createElement("tr");

      if (isCurrent) {
        row.classList.add("highlighted-row");
      }

      row.innerHTML = `
        <td>${medals[index] || ""}${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.completedSessions}</td>
        <td>${user.totalPoints}</td>
      `;

      leaderboardBody.appendChild(row);
    });

  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  }
}
