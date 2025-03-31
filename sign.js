document.getElementById("button").addEventListener("click", function () {
    let name = document.getElementById("user").value;
    let email = document.getElementById("Email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("pass").value;
    let confirmPassword = document.getElementById("cpass").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    let newUser = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    users.push(newUser);
    console.log("Saving to localStorage:", users); // ✅ Debugging

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful! Redirecting to login...");
    window.location.href = "login.html";
});
