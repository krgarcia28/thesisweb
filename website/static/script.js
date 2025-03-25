document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const loginBtn = document.getElementById("login");
  const registerBtn = document.getElementById("register");

  if (loginBtn && registerBtn) {
      registerBtn.addEventListener("click", () => {
          container.classList.add("active");
      });

      loginBtn.addEventListener("click", () => {
          container.classList.remove("active");
      });
  }
});
