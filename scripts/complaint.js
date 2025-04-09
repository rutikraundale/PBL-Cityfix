
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
});

// Auto-Select Department Based on Category
document.getElementById("cat").addEventListener("change", function () {
    let category = this.value;
    let departmentField = document.getElementById("department");

    // Mapping categories to departments
    let departmentMapping = {
        "sewage": "Municipal Corporation (MNC)",
        "circuit": "Electricity Board",
        "Pipe": "Water Supply Department",
        "Garbage": "Municipal Corporation (MNC)",
        "drug": "Police Department",
        "suspicios": "Police Department",
        "disturb": "Police Department",
        "animal": "Animal Welfare Board",
        "theft": "Police Department",
        "riot": "Police Department",
        "mob": "Police Department",
        "abuse": "Animal Welfare Board",
        "crime": "Cyber Crime Department",
        "threats": "Cyber Crime Department"
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

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                locationInput.value = `Lat: ${latitude}, Long: ${longitude}`;
                locationInput.setAttribute("data-maps", `https://www.google.com/maps?q=${latitude},${longitude}`);
                locationInput.style.cursor = "pointer";
                
                // Double-click se Google Maps open hoga
                locationInput.addEventListener("dblclick", function () {
                    window.open(locationInput.getAttribute("data-maps"), "_blank");
                });

                // Disable manual input if location is fetched
                locationInput.readOnly = true;
            },
            function (error) {
                alert("Location access denied! Manually enter location.");
                locationInput.placeholder = "Enter your location manually";
                locationInput.readOnly = false; // Enable manual input
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
        locationInput.placeholder = "Enter your location manually";
        locationInput.readOnly = false; // Enable manual input
    }
});

// Redirect to Home Page After Submission
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    
    window.location.href = "appid.html";
});