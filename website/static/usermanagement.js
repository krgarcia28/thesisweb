// ✅ Import Firebase Modules
import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js"; 
import { 
    getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, setDoc 
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// ✅ Firebase configuration (Replace with your Firebase project settings)
const firebaseConfig = {
    apiKey: "AIzaSyAOhsviZavR7VXKXHQMfcW95SeohE1QkNI",
    authDomain: "twebapp-77a14.firebaseapp.com",
    projectId: "twebapp-77a14",
    storageBucket: "twebapp-77a14.appspot.com", // Fixed the incorrect `.app` extension
    messagingSenderId: "640250469202",
    appId: "1:640250469202:web:0c1e8d94cd8ceb7b06f88b",
    measurementId: "G-8DZ0LLTC2M"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersCollection = collection(db, "user");

// ✅ DOM Elements
const formTitle = document.getElementById("form-title");
const userFormContainer = document.getElementById("user-form-container");
const userForm = document.getElementById("user-form");
const cancelBtn = document.getElementById("cancel-btn");
const addUserBtn = document.getElementById("add-user-btn");
const userTableBody = document.getElementById("user-table-body");
const registeredUsersCount = document.getElementById("registered-users");

// ✅ Function to Render Users
function renderUsers(snapshot) {
    if (!userTableBody) {
        console.error("User table body not found!");
        return;
    }
    
    userTableBody.innerHTML = ""; // 🔥 Clear table to prevent duplicates

    snapshot.docs.forEach((doc) => { // ✅ Use `.docs` to access array
        const user = doc.data();
        const userId = doc.id;

        // ✅ Create Table Row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.studentNumber || "N/A"}</td>
            <td>${user.name || "N/A"}</td>
            <td>${user.email || "N/A"}</td>
            <td>${user.role || "N/A"}</td>
            <td>
                <button onclick="editUser('${userId}', '${user.studentNumber}', '${user.name}', '${user.email}', '${user.role}')">Edit</button>
                <button onclick="deleteUser('${userId}')">Delete</button>
            </td>
        `;

        userTableBody.appendChild(row);
    });
}

// ✅ Function to Edit User (Pre-Fill Form)
window.editUser = function (userId, studentNumber, name, email, role) {
    document.getElementById("user-id").value = userId;
    document.getElementById("student-number").value = studentNumber || "";
    document.getElementById("user-name").value = name || "";
    document.getElementById("user-email").value = email || "";
    document.getElementById("user-role").value = role || ""; 

    formTitle.innerText = "Edit User"; // Change title
    userFormContainer.classList.add("active");
};

// ✅ Function to Update User in Firestore
async function updateUser(userId, studentNumber, name, email, role) {
    const userRef = doc(db, "user", userId);
    await updateDoc(userRef, { studentNumber, name, email, role }, { merge: true });
}

// ✅ Function to Delete User
window.deleteUser = async function (userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        await deleteDoc(doc(db, "user", userId));
    }
};

// ✅ Open Add User Form
addUserBtn.addEventListener("click", () => {
    document.getElementById("user-id").value = ""; 
    userForm.reset();
    formTitle.innerText = "Add User"; 
    userFormContainer.classList.add("active");
});

// ✅ Close User Form
cancelBtn.addEventListener("click", () => {
    userFormContainer.classList.remove("active");
});

// ✅ Handle User Form Submission (Add or Update)
userForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const uid = document.getElementById("user-id").value;
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const role = document.getElementById("user-role").value;
    const studentNumber = document.getElementById("student-number").value;

    if (uid) {
        // ✅ Update existing user
        await updateUser(uid, studentNumber, name, email, role);
    } else {
        // 🆕 Create a new user with Firestore-generated ID
        const newUserRef = await addDoc(usersCollection, {
            studentNumber,
            name,
            email,
            role,
            createdAt: new Date(),
            totalPoints: 0,
            completedSessions: 0,
        });

        console.log("User added with ID:", newUserRef.id);
    }

    userFormContainer.classList.remove("active");
    userForm.reset();
});

// ✅ Function to Update Registered Users Count
function updateRegisteredUsersCount(snapshot) {
    registeredUsersCount.innerText = snapshot.docs.length; // ✅ Update UI
}

// ✅ Real-time Listener for Firestore (Auto Update Count)
onSnapshot(usersCollection, (snapshot) => {
    updateRegisteredUsersCount(snapshot);
    renderUsers(snapshot); // ✅ Live update
});

// ✅ Expose deleteUser function globally
window.deleteUser = deleteUser;
