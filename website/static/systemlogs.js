import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOhsviZavR7VXKXHQMfcW95SeohE1QkNI",
  authDomain: "twebapp-77a14.firebaseapp.com",
  projectId: "twebapp-77a14",
  storageBucket: "twebapp-77a14.appspot.com",
  messagingSenderId: "640250469202",
  appId: "1:640250469202:web:0c1e8d94cd8ceb7b06f88b",
  measurementId: "G-8DZ0LLTC2M"
};

// Initialize Firebase only if it hasn't been initialized already
let app;
try {
  app = getApp();  // Try to get the default app
} catch (error) {
  app = initializeApp(firebaseConfig);  // If no default app exists, initialize it
}

const db = getFirestore(app);
const auth = getAuth(app);

async function fetchSystemLogs() {
  const logsTable = document.getElementById("system-logs-body");
  logsTable.innerHTML = ""; // Clear table first

  try {
    const q = query(collection(db, "systemLogs"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      const data = doc.data();
      const row = `
        <tr>
          <td>${data.timestamp?.toDate().toLocaleString() || "Pending"}</td>
          <td>${data.user || "Unknown"}</td>
          <td>${data.event}</td>
          <td>${data.details}</td>
        </tr>
      `;
      logsTable.innerHTML += row;
    });
  } catch (error) {
    console.error("Error fetching system logs:", error);
  }
}

window.addEventListener("DOMContentLoaded", fetchSystemLogs);
