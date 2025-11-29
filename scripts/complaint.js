// Complaint Form Handling
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get User Input Data
    let name = document.getElementById("name").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let email = document.getElementById("email").value.trim();
    let area = document.getElementById("area2").value.trim();
    let pincode = document.getElementById("pin2").value.trim();
    let category = document.getElementById("cat").value;
    let department = document.getElementById("department").value.trim();
    let location = document.getElementById("location").value.trim();
    let description = document.getElementById("prob").value.trim();
    let fileInput = document.getElementById("upload");

    // Basic validation
    if (
        !name || !mobile || !email || !area || !pincode ||
        !category || category === "Not selected" ||
        !department || !description
    ) {
        alert("Please fill in all the required details.");
        return;
    }

    // If you want location to be required, keep this:
    if (!location) {
        alert("Please provide your location (auto or manual).");
        return;
    }

    // Generate Unique Application ID
    let applicationID = "CF" + Date.now();

    // Helper: save complaint to localStorage
    function saveComplaint(imageData) {
        let complaintData = {
            applicationID: applicationID,
            name: name,
            mobile: mobile,
            email: email,
            area: area,
            pincode: pincode,
            category: category,
            department: department,
            location: location,
            description: description,
            image: imageData || "",
            status: "Pending"
        };

        let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
        complaints.push(complaintData);
        localStorage.setItem("complaints", JSON.stringify(complaints));

        // redirect to app id page
        window.location.href = "appid.html";

        // reset form
        document.querySelector("form").reset();
    }

    // If file is uploaded, read it as base64, else just save without image
    if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.onload = function () {
            let imageData = reader.result; // base64 string
            saveComplaint(imageData);
        };
        reader.readAsDataURL(file); // ✅ only here
    } else {
        saveComplaint("");
    }
});

// Auto-Select Department Based on Category
document.getElementById("cat").addEventListener("change", function () {
    let category = this.value;
    let departmentField = document.getElementById("department");

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
        "Cybercrime (Fraud/Scam)": "Cyber Crime Department",
        "Online/Mobile threats": "Cyber Crime Department",
        "Road Pothole": "Municipal Corporation (MNC)"
    };

    if (departmentMapping[category]) {
        departmentField.value = departmentMapping[category];
    } else {
        departmentField.value = "";
    }
});

// Auto-Fetch Location on Click
document.getElementById("location").addEventListener("click", function () {
    let locationInput = document.getElementById("location");

    if (!locationInput.value) {
        locationInput.value = "Fetching location...";
        locationInput.readOnly = true;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    locationInput.value = `Lat: ${latitude}, Long: ${longitude}`;
                    locationInput.setAttribute(
                        "data-maps",
                        `https://www.google.com/maps?q=${latitude},${longitude}`
                    );
                    locationInput.style.cursor = "pointer";

                    if (!locationInput.dataset.dblclickAdded) {
                        locationInput.addEventListener("dblclick", function () {
                            window.open(locationInput.getAttribute("data-maps"), "_blank");
                        });
                        locationInput.dataset.dblclickAdded = "true";
                    }

                    locationInput.readOnly = true;
                },
                function () {
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

// Protect page – require login
document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || !user.name) {
        alert("Please log in to register complaint.");
        window.location.href = "login.html";
        return;
    }
});
