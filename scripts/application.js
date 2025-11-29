document.addEventListener("DOMContentLoaded", function () {
  // 🔹 Protect page: only logged-in user can see
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || !user.name) {
    alert("Please log in to track your application status.");
    window.location.href = "login.html";
    return;
  }

  // 🔹 Show last generated Application ID (if you stored it in localStorage)
  const appIdSpan = document.getElementById("appIdText");
  const lastAppId = localStorage.getItem("lastApplicationID"); // adjust key name if different

  if (appIdSpan && lastAppId) {
    appIdSpan.textContent = lastAppId;
  }

  // 🔹 Attach listener for tracking form (if present on this page)
  const trackBtn = document.querySelector(".sub button");
  if (trackBtn) {
    trackBtn.addEventListener("click", function () {
      const appIdInput = document.getElementById("appId");
      const appId = appIdInput ? appIdInput.value.trim() : "";
      const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

      if (!appId) {
        alert("Please enter a valid Application ID.");
        return;
      }

      const foundComplaint = complaints.find(
        complaint => complaint.applicationID === appId
      );

      if (foundComplaint) {
        displayComplaintDetails(foundComplaint);
      } else {
        alert("Application ID not found!");
      }
    });
  }
});

// 🔙 Back to home
function goBackHome() {
  window.location.href = "home.html";
}

// 🔹 Table builder (same as yours, just slightly cleaned)
function displayComplaintDetails(complaint) {
  const existingTable = document.getElementById("complaintTable");
  if (existingTable) {
    existingTable.remove();
  }

  const table = document.createElement("table");
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
      <td>${complaint.remarks || "-"}</td>
    </tr>
  `;

  const tableContainer = document.createElement("div");
  tableContainer.className = "table-container";
  tableContainer.appendChild(table);

  const container = document.querySelector(".container") || document.body;
  container.appendChild(tableContainer);
}
