document.getElementById("button").addEventListener("click", function (e) {
    
    let name = document.getElementById("user").value.trim();
    let email = document.getElementById("Email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("pass").value.trim();
    let confirmPassword = document.getElementById("cpass").value.trim();
    
    
    if(password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    if(!name || !email|| !phone|| !password|| !confirmPassword){
        e.preventDefault();
        alert("Please enter all details!");
    }
    else{
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

    
    window.location.href = "login.html";

    }

    
});
document.getElementById('')