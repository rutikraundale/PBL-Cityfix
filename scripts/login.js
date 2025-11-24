document.addEventListener("DOMContentLoaded", function () {
  let logBtn = document.getElementById("log");

  if (!localStorage.getItem("adminuser")) {
      localStorage.setItem("adminuser", "admin$123@gmail.com");
      localStorage.setItem("adminpass", "adM@in33");
  }

  if (logBtn) {
      logBtn.addEventListener("click", function (event) {
          event.preventDefault();

          let email = document.getElementById("email").value.trim();
          let password = document.getElementById("password").value.trim();

          let adminuser = localStorage.getItem("adminuser");
          let adminpass = localStorage.getItem("adminpass");

          // Admin login
          if (email === adminuser && password === adminpass) {
              alert("Redirecting to administration...");
              localStorage.setItem("isadmin", "true");
              window.location.href = "admin.html";
              return;
          }

          // Normal user login
          let users = JSON.parse(localStorage.getItem("users")) || [];
          let existingUser = users.find(
            user => user.email === email && user.password === password
          );

          if (existingUser) {
              localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
              window.location.href = "home.html";
          } else {
              alert("Invalid email or password. Please try again.");
          }
      });
  }
});
