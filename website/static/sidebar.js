
document.addEventListener("DOMContentLoaded", function() {
    const sidebarLinks = document.querySelectorAll(".sidebar a[data-target]");
    const contentSections = document.querySelectorAll(".content-section");

    sidebarLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent page reload

            // Remove "active" class from all sections
            contentSections.forEach(section => section.classList.remove("active"));

            // Get target section ID
            const targetId = this.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);

            // Show the target section
            if (targetSection) {
                targetSection.classList.add("active");
            }
        });
    });
});

