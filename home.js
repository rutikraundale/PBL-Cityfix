// Ensure the script runs after the page loads
document.addEventListener("DOMContentLoaded", function () {
    const images = ["images/pothhole.png","images/sewage.jpg","images/theft.jpg","images/swach.png","images/cyber.avif"]; // Corrected paths
    let index = 0;
    const sliderImage = document.getElementById("sliderImage");

    function slideImages() {
        index = (index + 1) % images.length; // Move to next image in sequence
        sliderImage.style.opacity = 0; // Fade-out effect

        setTimeout(() => {
            sliderImage.src = images[index]; // Change image
            sliderImage.style.opacity = 1; // Fade-in effect
        }, 400); // Wait 500ms before changing image
    }

    // Auto-slide every 3 seconds
    setInterval(slideImages, 2000);
});

//menu bar
function toggleMenu() {
    var menu = document.getElementById("navMenu");
    menu.classList.toggle("active");
}

//Search Box 
function showSuggestions() {
    document.getElementById("suggestionsList").style.display = "block";
}

function filterSuggestions() {
    let input = document.getElementById("query").value.toLowerCase();
    let suggestions = document.querySelectorAll("#suggestionsList li");

    suggestions.forEach(item => {
        if (item.textContent.toLowerCase().includes(input)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function selectSuggestion(element) {
    document.getElementById("query").value = element.textContent;
    document.getElementById("suggestionsList").style.display = "none";
}

// Hide suggestions when clicking outside
document.addEventListener("click", function(event) {
    let searchBox = document.querySelector(".rightbox");
    if (!searchBox.contains(event.target)) {
        document.getElementById("suggestionsList").style.display = "none";
    }
});

