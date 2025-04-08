document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || !user.name) {
        alert("Please log in to access the register complaint");
        window.location.href = "login.html";
        return;
    }
});

// Complaint Form Handling
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let mobile = document.getElementById("mobile").value;
    let email = document.getElementById("email").value;
    let area = document.getElementById("area2").value;
    let pincode = document.getElementById("pin2").value;
    let category = document.getElementById("cat").value;
    let department = document.getElementById("department").value;

    // Get location from data attribute or fallback to manual input
    let locationAttr = document.getElementById("location").getAttribute("data-location");
    let location = locationAttr ? JSON.parse(locationAttr) : document.getElementById("location").value;

    let description = document.getElementById("prob").value;
    let fileInput = document.getElementById("upload");

    let applicationID = "CF" + Date.now();

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
            department: department,
            location: location,
            description: description,
            image: imageData,
            status: "Pending"
        };

        let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
        complaints.push(complaintData);
        localStorage.setItem("complaints", JSON.stringify(complaints));

        alert("Complaint Submitted Successfully! Your Application ID: " + applicationID);
        document.querySelector("form").reset();
        window.location.href = "home.html";
    }
});

// Auto-Select Department Based on Category
document.getElementById("cat").addEventListener("change", function () {
    let category = this.value;
    let departmentField = document.getElementById("department");

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

    departmentField.value = departmentMapping[category] || "";
});

// Auto-Fetch Location on Click
document.getElementById("location").addEventListener("click", function () {
    let locationInput = document.getElementById("location");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;

                const locationObj = {
                    lat: latitude,
                    long: longitude
                };

                locationInput.setAttribute("data-location", JSON.stringify(locationObj));
                locationInput.value = `Lat: ${latitude.toFixed(5)}, Long: ${longitude.toFixed(5)}`;
                locationInput.setAttribute("data-maps", `https://www.google.com/maps?q=${latitude},${longitude}`);
                locationInput.style.cursor = "pointer";
                locationInput.readOnly = true;

                locationInput.addEventListener("dblclick", function () {
                    window.open(locationInput.getAttribute("data-maps"), "_blank");
                });
            },
            function (error) {
                alert("Location access denied! Manually enter location.");
                locationInput.placeholder = "Enter your location manually";
                locationInput.readOnly = false;
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
        locationInput.placeholder = "Enter your location manually";
        locationInput.readOnly = false;
    }
});
