
window.onload = function () {
    let isadmin = localStorage.getItem("isadmin");
    if (isadmin !== "true") {
        alert("Unauthorized Access. Redirecting...");
        window.location.href = "home.html";
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const logout = document.getElementById("logoutbtn");
    if (logout) {
        logout.addEventListener("click", function () {

            const confirmlgt = window.confirm("Confirm to terminate this session");
            if (confirmlgt) {
                localStorage.removeItem("isadmin");
                window.location.href = "home.html";
            }
        });

    }

});
function loadcontent(section) {
    const content = {
        problems: getregproblem,
        analytics: getanalytics,
        adminC: getadmincontrol,
        feedback: getfeedback,

    };


    document.getElementById("main-content").innerHTML = content[section]?.() || `
    <h2>Welcome to administration page</h2>
    <p>Select the option from the menu</p>
`;

    if (section === 'analytics') setTimeout(initChart, 100);

}


let chartInstance = null;

function initChart() {
    const Complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    let pendingcnt = 0;
    let solvedcnt = 0;
    let rejectcnt = 0;

    Complaints.forEach(c => {
        if (c.status === "Pending") pendingcnt++;
        else if (c.status === "Rejected") rejectcnt++;
        else if (c.status === "Solved") solvedcnt++;
    });

    const canvas = document.getElementById("myChart");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        // destroy previous chart if it exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Pending", "Solved", "Rejected"],
                datasets: [{
                    data: [pendingcnt, solvedcnt, rejectcnt],
                    backgroundColor: ["orange", "green", "red"]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Complaint Status Overview' }
                }
            }
        });
    }
}


function getlocationFromString(locationString) {
    // Example format: "Lat: 20.015289980529847, Long: 73.84046263740824"
    const match = locationString.match(/Lat:\s*([-\d.]+),\s*Long:\s*([-\d.]+)/);

    if (match) {
        const lat = match[1];
        const long = match[2];
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
        window.open(url, '_blank');
    } else {
        alert("Invalid location format");
    }
};
function openImageInNewTab(base64Data) {
    const newTab = window.open();
    if (newTab) {
        newTab.document.write(`
            <html>
                <head><title>Image Preview</title></head>
                <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f0f0;">
                    <img src="${base64Data}" alt="Complaint Image" style="max-width: 100%; max-height: 100%;"/>
                </body>
            </html>
        `);
        newTab.document.close();
    } else {
        alert("Popup blocked! Please allow popups for this site.");
    }
}



function getregproblem() {
    let Complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    if (Complaints.length === 0) {
        return `<h2>Registered Complaints</h2><p>No complaints registered yet.</p>`;
    }

    let table = `
        <h2>Registered Complaints</h2>
        <table border="1" style="width: 100%; border-collapse: collapse; font-family: Arial; overflow-x: scroll;">
            <tr style="background-color: #333; color: white; height: 40px; overflow-x: scroll;">
                <th style="padding: 10px;">Application ID</th>
                <th style="padding: 10px;">Name</th>
                <th style="padding: 10px;">Email</th>
                <th style="padding: 10px;">Mobile No</th>
                <th style="padding: 10px;">Category</th>
                <th style="padding: 10px;">Department</th>
                <th style="padding: 10px;">Area</th>
                <th style="padding: 10px;">Location</th>
                <th style="padding: 10px;">Pincode</th>
                <th style="padding: 10px;">Description</th>
                <th style="padding: 10px;">Status</th>
                <th style="padding: 10px;">Image</th> <!-- 👈 New image column -->
            </tr>
    `;

    Complaints.forEach((c, index) => {
        let statusColor = "";
        if (c.status === "Solved") {
            statusColor = "green";
        } else if (c.status === "Rejected") {
            statusColor = "red";
        } else {
            statusColor = "orange"; // Pending
        }

        table += `
            <tr style="overflow-x:scroll;">
                <td style="padding: 10px; border: 1px solid #ccc;">${c.applicationID}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.name}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.email}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.mobile}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.category}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.department}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.area}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">
                    ${typeof c.location === "string" && c.location.includes("Lat:")
                ? `<a href="#" onclick='event.preventDefault(); getlocationFromString(${JSON.stringify(c.location)})'>${c.location}</a>`
                : (c.location || "N/A")
            }
                </td>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.pincode}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.description}</td>
                <td style="padding: 10px; border: 1px solid #ccc; color: ${statusColor};">${c.status}</td>
                <td>
                     <img src="${c.image}" alt="Complaint Image" style="width: 100px; height: auto; cursor: pointer;"
                            onclick="openImageInNewTab('${c.image}')" />
                </td>
                   

            </tr>
        `;
    });

    table += `</table>`;
    return table;
}

function getanalytics() {

    return `<canvas id="myChart" style="height: 400px;"></canvas>
`;
}



function getadmincontrol() {
    let Complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    if (Complaints.length === 0) {
        return `<h2>Soon data will be published</h2>`;
    }

    let table = `
        <h2>Admin Controls</h2>
        <table border="1" style="width: 100%; border-collapse: collapse; font-family: Arial;">
            <tr style="background-color: #333; color: white; height: 40px;">
                <th>Application Number</th>
                <th>Name</th>
                <th>Complaint</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
    `;

    Complaints.forEach((c, index) => {
        table += `
            <tr>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.applicationID}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.name}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.category}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">${c.description}</td>
                <td style="padding: 10px; border: 1px solid #ccc;">
                    <select id="status-${index}" style="width: 100%; padding: 5px;" onchange="updateTextareaColor(${index})">

                        <option value="Pending" ${c.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Solved" ${c.status === "Solved" ? "selected" : ""}>Solved</option>
                        <option value="Rejected" ${c.status === "Rejected" ? "selected" : ""}>Rejected</option>
                    </select>
                    <textarea id="remarks-${index}" placeholder="Enter remarks..." style="width: 100%; margin-top: 5px; padding: 5px;">${c.remarks || ""}</textarea>
                    <div style="margin-top: 5px;">
                        <button onclick="updateComplaint(${index})" style="padding: 5px 10px;">Update</button>
                        <button onclick="resetAction(${index})" style="padding: 5px 10px; margin-left: 5px;">Reset</button>
                    </div>
                </td>
            </tr>
        `;
    });

    table += `</table>`;
    return table;
}

function updateComplaint(index) {
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    let status = document.getElementById(`status-${index}`).value;
    let remarks = document.getElementById(`remarks-${index}`).value;

    // Update status and remarks
    complaints[index].status = status;
    complaints[index].remarks = remarks;

    localStorage.setItem("complaints", JSON.stringify(complaints));
    alert(`Complaint updated as "${status}"`);
}

function resetAction(index) {
    document.getElementById(`status-${index}`).value = "Pending";
    document.getElementById(`remarks-${index}`).value = "";
}
function updateTextareaColor(index) {
    const status = document.getElementById(`status-${index}`).value;
    const textarea = document.getElementById(`remarks-${index}`);

    if (status === "Solved") {
        textarea.style.backgroundColor = "#d4edda"; // Light green
        textarea.style.color = "#155724";
    } else if (status === "Rejected") {
        textarea.style.backgroundColor = "#f8d7da"; // Light red
        textarea.style.color = "#721c24";
    } else if (status === "Pending") {
        textarea.style.backgroundColor = "#fff3cd"; // Light yellow
        textarea.style.color = "#856404";
    }
}


function getfeedback() {

    let feedbacknew = JSON.parse(localStorage.getItem("feedbacknew")) || []
    if (feedbacknew.length === 0) {
        return `
        <h2>No Feedback Submitted Yet!</h2>
    `
    };


    let table = `
        <h2>Feeback Details</h2>
        <table border="1" style="width: 100%; border-collapse: collapse; font-family: Arial; overflow-x: scroll;">
        <tr  style="background-color: #333; color: white;overflow-x: scroll;">
        <th style="padding: 10px;">Name</th>
        <th style="padding: 10px;">Email ID</th>
        <th style="padding: 10px;">Type</th>
        <th style="padding: 10px;">Feedback</th>
        
        </tr>
        
    `;
    feedbacknew.forEach(c => {
        table += `
            <tr>
            <td style="padding: 10px; border: 1px solid #ccc;" >${c.name}</td>
            <td style="padding: 10px; border: 1px solid #ccc;">${c.email}</td>
            <td style="padding: 10px; border: 1px solid #ccc;">${c.type}</td>
            <td style="padding: 10px; border: 1px solid #ccc;">${c.message}</td>
            </tr>
        `;


    });
    table += `</table>`
    return table;
}
function toggleDropdown(parentLi, event) {
    event.stopPropagation(); // Stop event from bubbling to the parent <li>
    const sublist = parentLi.querySelector('.sub-list'); // Find the sublist <ul> under the clicked <li>
    if (sublist) {
        sublist.classList.toggle('active'); // Toggle visibility of the sublist
    }
}



function toggleDropdown(span) {
    const dropdown = span.parentElement;
    dropdown.classList.toggle("open");
}


function loadDepartmentContent(departmentName) {
    // Filter complaints by department
    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    const filtered = complaints.filter(c => c.department === departmentName);

    let html = `<h2>${departmentName} Complaints</h2>`;

    if (filtered.length === 0) {
        html += `<p>No complaints registered under this department.</p>`;
    } else {
        html += `
            <table border="1" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <th>Application ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Category</th>
                    <th>Area</th>
                    <th>Pincode</th>
                    <th>Description</th>
                    <th style="padding: 10px;">Location</th>
                    <th>Status</th>
                    <th style="padding: 10px;">Image</th> <!-- 👈 New image column -->
                </tr>
        `;

        filtered.forEach(c => {
            let statusColor = c.status === "Solved" ? "green" : c.status === "Rejected" ? "red" : "orange";
            html += `
                <tr>
                    <td>${c.applicationID}</td>
                    <td>${c.name}</td>
                    <td>${c.email}</td>
                    <td>${c.mobile}</td>
                    <td>${c.category}</td>
                    <td>${c.area}</td>
                    <td>${c.pincode}</td>
                    <td>${c.description}</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">
                    ${typeof c.location === "string" && c.location.includes("Lat:")
                    ? `<a href="#" onclick='event.preventDefault(); getlocationFromString(${JSON.stringify(c.location)})'>${c.location}</a>`
                    : (c.location || "N/A")
                }
                </td>
                    <td style="color:${statusColor}">${c.status}</td>
                    <td>
                     <img src="${c.image}" alt="Complaint Image" style="width: 100px; height: auto; cursor: pointer;"
                            onclick="openImageInNewTab('${c.image}')" />
                    </td>

                </tr>
            `;
        });

        html += `</table>`;
    }

    document.getElementById("main-content").innerHTML = html;
}
