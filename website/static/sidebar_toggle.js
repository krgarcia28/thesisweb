document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector(".sidebar");
    const hamburger = document.querySelector(".hamburger");

    hamburger.addEventListener("click", function() {
        sidebar.classList.toggle("active"); // Toggle sidebar visibility
    });
});