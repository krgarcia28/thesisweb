// ✅ Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc,updateDoc, deleteDoc,addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLFd7twvtDcmqZNs2A2BzGgpESDvOkP6U",
    authDomain: "thesisdatabase-d3339.firebaseapp.com",
    projectId: "thesisdatabase-d3339",
    storageBucket: "thesisdatabase-d3339.firebasestorage.app",
    messagingSenderId: "8786323112",
    appId: "1:8786323112:web:5d92d993e4b4504a48849d",
    measurementId: "G-FDS9DCX4EX"
  };

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersCollection = collection(db, "users");
const formTitle = document.getElementById("form-title");
const userFormContainer = document.getElementById("user-form-container");
const userForm = document.getElementById("user-form");
const cancelBtn = document.getElementById("cancel-btn");
const addUserBtn = document.getElementById("add-user-btn");


// ✅ Function to Render Users
function renderUsers(snapshot) {
    const userTableBody = document.getElementById("user-table-body");
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
            <td>${user.studentNumber}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="editUser('${user.studentNumber}', '${user.name}', '${user.email}', '${user.role}')">Edit</button>
                <button onclick="deleteUser('${userId}')">Delete</button>
            </td>
        `;

        userTableBody.appendChild(row);
    });
}



// ✅ Function to Edit User (Pre-Fill Form)
window.editUser = function (studentNumber, name, email, role) {
    document.getElementById("user-id").value = studentNumber;
    document.getElementById("user-name").value = name;
    document.getElementById("user-email").value = email;
    document.getElementById("user-role").value = role; // ✅ Ensure role is set

    formTitle.innerText = "Edit User"; // Change title
    userFormContainer.classList.add("active");
};

// ✅ Function to Update User in Firestore
async function updateUser(studentNumber, name, email, role) {
    const userRef = doc(db, "users", studentNumber);
    await updateDoc(userRef, { name, email, role }); // ✅ Ensure role is updated
}

// ✅ Function to Delete User
window.deleteUser = async function (userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        await deleteDoc(doc(db, "users", userId));
    }
};

// ✅ Open Add User Form
addUserBtn.addEventListener("click", () => {
    document.getElementById("user-id").value = ""; // Reset ID
    userForm.reset();
    formTitle.innerText = "Add User"; // Change title
    userFormContainer.classList.add("active");
});

// ✅ Close User Form
cancelBtn.addEventListener("click", () => {
    userFormContainer.classList.remove("active");
});

// ✅ Handle User Form Submission (Add or Update)
userForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = document.getElementById("user-id").value;
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const role = document.getElementById("user-role").value; // ✅ Ensure role is fetched

    if (studentNumber) {
        await updateUser(studentNumber, name, email, role); // ✅ Update user role
    } else {
        await addDoc(usersCollection, { name, email, role }); // ✅ Add new user
    }

    userFormContainer.classList.remove("active");
    userForm.reset();
});
// ✅ Function to Update Registered Users Count
function updateRegisteredUsersCount(snapshot) {
    const userCount = snapshot.docs.length; // ✅ Count number of users
    document.getElementById("registered-users").innerText = userCount; // ✅ Update UI
}

// ✅ Real-time Listener for Firestore (Auto Update Count)
onSnapshot(usersCollection, (snapshot) => {
    updateRegisteredUsersCount(snapshot);
});

// ✅ Real-time Firestore Listener
onSnapshot(usersCollection, (snapshot) => {
    if (!snapshot.empty) {
        renderUsers(snapshot); // ✅ Live update
    } else {
        console.warn("No users found in Firestore.");
    }
});

// ✅ Expose deleteUser function globally
window.deleteUser = deleteUser;
