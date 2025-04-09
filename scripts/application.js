document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("loggedInUser")); // Parse the user object
    if (!user || !user.name) {  // Check if user exists and has a name
        alert("Please log in to track your application status.");
        window.location.href = "login.html";
        return;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".sub button").addEventListener("click", function () {
        let appId = document.getElementById("appId").value.trim();
        let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

        if (!appId) {
            alert("Please enter a valid Application ID.");
            return;
        }

        let foundComplaint = complaints.find(complaint => complaint.applicationID === appId);

        if (foundComplaint) {
            displayComplaintDetails(foundComplaint);
        } else {
            alert("Application ID not found!");
        }
    });
});

function displayComplaintDetails(complaint) {
    let existingTable = document.getElementById("complaintTable");
    if (existingTable) {
        existingTable.remove();
    }

    let table = document.createElement("table");
    table.id = "complaintTable";
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Application ID</th>
            <th>Status</th>
            <th>Remarks</th>
            
        </tr>
        <tr>
            <td>${complaint.name}</td>
            <td>${complaint.applicationID}</td>
            <td>${complaint.status || "Pending"}</td>
            <td>${complaint.remarks}</td>

        </tr>
    `;

    // Table ko center me laane ke liye container me wrap kar raha hoon
    let tableContainer = document.createElement("div");
    tableContainer.className = "table-container";
    tableContainer.appendChild(table);

    document.querySelector(".container").appendChild(tableContainer);
}
