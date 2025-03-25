document.addEventListener("DOMContentLoaded", function() {
    // Ensure the button exists before adding event listener
    const logoutButton = document.getElementById("logout-btn");

    if (!logoutButton) {
        console.error("Logout button not found!");
        return; // Stop execution if the button doesn't exist
    }

    logoutButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent page reload

        console.log("Logout button clicked!"); // Debugging

        // Show confirmation popup
        const confirmLogout = confirm("Are you sure you want to log out?");
        
        if (confirmLogout) {
            console.log("User confirmed logout"); // Debugging

            // Clear user session or local storage
            localStorage.removeItem("user"); // If storing user data in localStorage
            sessionStorage.clear(); // Clears session storage

            console.log("User session cleared. Redirecting to login...");

            // Redirect to login page
            window.location.href = "index.html"; // Change this to your login page
        } else {
            console.log("Logout canceled");
        }
    });
});