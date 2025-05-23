
// Complaint Form Handling

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page
    
    // Get User Input Data
    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let email = document.getElementById("email").value;
    let area = document.getElementById("area2").value;
    let pincode = document.getElementById("pin2").value;
    let category = document.getElementById("cat").value;
    let department = document.getElementById("department").value;
    let location = document.getElementById("location").value;
    let description = document.getElementById("prob").value;
    let fileInput = document.getElementById("upload");
    
    if (
        !name || !mobile || !email || !area || !pincode ||
        !category || !department || !location || !description ||
        fileInput.files.length === 0
    ) {
        alert("Please fill in all the details and upload an image.");
        return;
    }
    // Generate Unique Application ID
    let applicationID = "CF" + Date.now();
    
    // Store Image as Base64 (if uploaded)
    let imageData = "";
    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            imageData = reader.result;
            saveComplaint();
        };
    } else {
        saveComplaint();
    }
    
    
    function saveComplaint() {
        let complaintData = {
            applicationID: applicationID,
            name: name,
            mobile: mobile,
            email: email,
            area: area,
            pincode: pincode,
            category: category,
            department: department, // Added Department
            location: location,
            description: description,
            image: imageData,
            status: "Pending"
        };
        
        // Get existing complaints from localStorage
        let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
        complaints.push(complaintData);
        localStorage.setItem("complaints", JSON.stringify(complaints));

        window.location.href="appid.html";

 
       
        document.querySelector("form").reset();
    }
    reader.readAsDataURL(fileInput.files[0]);
});

// Auto-Select Department Based on Category
document.getElementById("cat").addEventListener("change", function () {
    let category = this.value;
    let departmentField = document.getElementById("department");

    // Mapping categories to departments
    let departmentMapping = {
        "Drainage/Sewage Overflow": "Municipal Corporation (MNC)",
        "Short Circuit on Pole": "Electricity Board",
        "Water Leakage in Pipeline": "Water Supply Department",
        "Garbage Leftover": "Municipal Corporation (MNC)",
        "Illegal Activities": "Police Department",
        "Suspicious Activities": "Police Department", 
        "Public Disturbance": "Police Department",
        "Animal Torture": "Animal Welfare Board",
        "Theft": "Police Department",
        "Pre-Riot Info": "Police Department",
        "Mob Gathering": "Police Department",
        "Cybercrime (Fraud/Scam)": "Animal Welfare Board",
        "Online/Mobile threats": "Cyber Crime Department",
        "Road Pothole":"Municipal Corporation (MNC)",
    };

    // Set department based on category
    if (departmentMapping[category]) {
        departmentField.value = departmentMapping[category];
    } else {
        departmentField.value = "";
    }
});



// Auto-Fetch Location on Click
document.getElementById("location").addEventListener("click", function () {
    let locationInput = document.getElementById("location");

    // Only fetch location if field is not already filled
    if (!locationInput.value) {
        locationInput.value = "Fetching location...";
        locationInput.readOnly = true;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    locationInput.value = `Lat: ${latitude}, Long: ${longitude}`;
                    locationInput.setAttribute("data-maps", `https://www.google.com/maps?q=${latitude},${longitude}`);
                    locationInput.style.cursor = "pointer";

                    // Prevent multiple double-click bindings
                    if (!locationInput.dataset.dblclickAdded) {
                        locationInput.addEventListener("dblclick", function () {
                            window.open(locationInput.getAttribute("data-maps"), "_blank");
                        });
                        locationInput.dataset.dblclickAdded = "true";
                    }

                    locationInput.readOnly = true;
                },
                function (error) {
                    // Access denied or error
                    alert("Location access denied! You can enter your location manually.");
                    locationInput.value = "";
                    locationInput.placeholder = "Enter your location manually";
                    locationInput.readOnly = false;
                    locationInput.style.cursor = "text";
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            locationInput.value = "";
            locationInput.placeholder = "Enter your location manually";
            locationInput.readOnly = false;
            locationInput.style.cursor = "text";
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("loggedInUser")); // Parse the user object
    if (!user || !user.name) {  // Check if user exists and has a name
        alert("Please log in to register complaint.");
        window.location.href = "login.html";
        return;
    }
});