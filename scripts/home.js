document.addEventListener("DOMContentLoaded", function () {
    const sliderImage = document.getElementById("sliderImage");

    if (sliderImage) { // Pehle check karo ki image element exist karta hai ya nahi
        const images = ["images/pothhole.png", "images/sewage.jpg", "images/theft.jpg", "images/swach.png", "images/cyber.avif"];
        let index = 0;

        function slideImages() {
            index = (index + 1) % images.length;
            sliderImage.style.opacity = 0;
            setTimeout(() => {
                sliderImage.src = images[index];
                sliderImage.style.opacity = 1;
            }, 400);
        }
        setInterval(slideImages, 2000);
    } else {
        console.log("Slider image not found");
    }
});

    // **Menu Toggle**
    document.querySelector(".menu-icon").addEventListener("click", function () {
        document.getElementById("navMenu").classList.toggle("active");
    });


    // **Search Box Handling**
    function showSuggestions() {
        document.getElementById("suggestionsList").style.display = "block";
    }
    function filterSuggestions() {
        let input = document.getElementById("query").value.toLowerCase();
        let suggestions = document.querySelectorAll("#suggestionsList li");
        suggestions.forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
        });
    }
    function selectSuggestion(element) {
        document.getElementById("query").value = element.textContent;
        document.getElementById("suggestionsList").style.display = "none";
    }
    document.addEventListener("click", function (event) {
        let searchBox = document.querySelector(".rightbox");
        if (!searchBox.contains(event.target)) {
            document.getElementById("suggestionsList").style.display = "none";
        }
    });

    
    document.addEventListener("DOMContentLoaded", function () {
        const loginBtn = document.getElementById("loginbtn");
        if (loginBtn) {
            loginBtn.addEventListener("click", function () {
                window.location.href = "login.html";
            });
        }
    
        // Authentication Handling
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        let loginContainer = document.querySelector(".Login");
        let userInfoContainer = document.querySelector(".user-info");
        let usernameDisplay = document.getElementById("usernameDisplay");
        let logoutBtn = document.getElementById("logoutBtn");
    
        if (loggedInUser) {
            console.log("User logged in:", loggedInUser);
    
            // Login button hide
            if (loginBtn) loginBtn.style.display = "none";
    
            // Ensure elements exist before modifying them
            if (usernameDisplay) {
                usernameDisplay.textContent = `Welcome, ${loggedInUser.name}`;
                usernameDisplay.style.color = "white";
            } else {
                console.error("usernameDisplay not found in DOM");
            }
    
            if (logoutBtn) {
                logoutBtn.style.display = "block";
                logoutBtn.addEventListener("click", function () {
                    localStorage.removeItem("loggedInUser");
                    location.reload();
                });
            } else {
                console.error("logoutBtn not found in DOM");
            }
    
            if (userInfoContainer) {
                userInfoContainer.style.display = "flex";
            } else {
                console.error("userInfoContainer not found in DOM");
            }
        } else {
            console.log("User NOT logged in");
        }
    });
    function showSuggestions() {
        document.getElementById("suggestionsList").style.display = "block";
    }
    
    function filterSuggestions() {
        let input = document.getElementById("query").value.toLowerCase();
        let suggestions = document.querySelectorAll("#suggestionsList li");
    
        suggestions.forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
        });
    }
    
    function selectSuggestion(element) {
        let text = element.textContent.trim(); // Get selected suggestion text
    
        // Define redirection links based on the selected suggestion
        let pageLinks = {
            "Register Complaint": "complaint.html",
            "Track Application Status": "application.html",
            "Analytics": "analytics.html",
            "Discussion": "community.html"
        };
    
        if (pageLinks[text]) {
            window.location.href = pageLinks[text]; // Redirect to the respective page
        } else {
            console.error("No matching page found for:", text);
        }
    }
    
    



document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // **Restricted Pages List**
    let restrictedLinks = ["complaint.html", "application.html","community.html"];

    // **Sabhi links ko check karo**
    document.querySelectorAll("a").forEach(link => {
        let href = link.getAttribute("href");

        // **Agar yeh restricted link hai aur user logged in nahi hai**
        if (restrictedLinks.includes(href) && !loggedInUser) {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // **Redirect hone se rokna**
                alert("You must be logged in to access this page!");
            });
        }
    });
});

