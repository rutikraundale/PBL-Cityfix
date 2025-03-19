document.addEventListener("DOMContentLoaded", function () {
    // Form validation
    const form = document.querySelector("form");
    const nameInput = document.getElementById("user");
    const emailInput = document.getElementById("Email");
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("pass");
    const confirmPasswordInput = document.getElementById("cpass");
    const submitButton = document.getElementById("button");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!nameInput.value.trim()) {
            alert("Please enter your name");
            return;
        }

        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
            alert("Please enter a valid email");
            return;
        }

        if (!phoneInput.value.trim() || phoneInput.value.length !== 10) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }

        if (passwordInput.value.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("Passwords do not match");
            return;
        }

        alert("Account Created Successfully!");
        form.reset();
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Toggle password visibility
    const togglePassword = (inputField) => {
        inputField.type = inputField.type === "password" ? "text" : "password";
    };

    document.getElementById("pass").addEventListener("dblclick", function () {
        togglePassword(this);
    });

    document.getElementById("cpass").addEventListener("dblclick", function () {
        togglePassword(this);
    });

    // Search functionality
    const searchButton = document.querySelector(".rightbox button");
    const searchInput = document.getElementById("query");
    
    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (searchInput.value.trim()) {
            alert("Searching for: " + searchInput.value);
        } else {
            alert("Please enter a search query");
        }
    });

    // Login/Register button functionality
    document.querySelector(".Login button").addEventListener("click", function () {
        alert("Redirecting to login/register page...");
        // window.location.href = "login.html"; // Uncomment if you have a login page
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll(".nav a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });
});
