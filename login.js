document.getElementById("log").addEventListener("click", function (event) {
    event.preventDefault(); // Form submit hone se rokna

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Local storage se users ka data get karna
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check karna ki user exist karta hai ya nahi
    let existingUser = users.find(user => user.email === email && user.password === password);

    if (existingUser) {
        alert("Login successful!");

        // Logged in user ka data localStorage me store karna
        localStorage.setItem("loggedInUser", JSON.stringify(existingUser));

        // Home page pe redirect karna
        window.location.href = "home.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});
