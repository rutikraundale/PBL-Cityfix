console.log("HOME JS LOADED");


document.addEventListener("DOMContentLoaded", function () {
    const sliderImage = document.getElementById("sliderImage");

    if (sliderImage) {
        const images = [
            "images/image1.jpg",
            "images/img2.jpg",
            "images/img3.jpg",
            "images/img4.jpg",
            "images/img5.jpg"
            
        ];
        let index = 0;

        function slideImages() {
            index = (index + 1) % images.length;
            sliderImage.style.opacity = 1;
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
const menuIcon = document.querySelector(".menu-icon");
const navMenu = document.getElementById("navMenu");

if (menuIcon && navMenu) {
  menuIcon.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });
}


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
  const userInfoContainer = document.querySelector(".user-info");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const logoutBtn = document.getElementById("logoutBtn");

  // Redirect to login page on click
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
    
      window.location.href = "login.html";

    });
  }

  // Authentication Handling
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    console.log("User logged in:", loggedInUser);

    // Hide login button
    if (loginBtn) loginBtn.style.display = "none";

    // Show welcome text
    if (usernameDisplay) {
      usernameDisplay.textContent = `Welcome, ${loggedInUser.name}`;
      // make it more visible on navbar
      usernameDisplay.classList.remove("text-muted-custom");
      usernameDisplay.classList.add("text-primary-custom");
    }

    // Show logout button + attach handler
    if (logoutBtn) {
      logoutBtn.style.display = "block";

      // avoid multiple listeners
      logoutBtn.onclick = function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "home.html";
      };
    }

    // Make sure user info is visible
    if (userInfoContainer) {
      userInfoContainer.style.display = "flex";
    }
  } else {
    console.log("User NOT logged in");

    // Hide user info when not logged in
    if (userInfoContainer) {
      userInfoContainer.style.display = "none";
    }
  }
});


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
console.log("loginBtn:", loginBtn);






document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // **Restricted Pages List**
    let restrictedLinks = ["complaint.html", "application.html", "community.html"];

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

