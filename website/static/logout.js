function logout() {
    firebase.auth().signOut().then(() => {
        console.log("User signed out successfully.");
        window.location.href = "/index.html"; // Redirect to login page
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
}
