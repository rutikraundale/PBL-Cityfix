document.addEventListener("DOMContentLoaded", function () {
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    let solved = complaints.filter(c => c.status === "solved").length;
    let rejected = complaints.filter(c => c.status === "rejected").length;
    let pending = complaints.filter(c => c.status === "pending").length;

    let ctx = document.getElementById("complaintChart").getContext("2d");

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Solved", "Rejected", "Pending"],
            datasets: [{
                data: [solved, rejected, pending],
                backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
                borderColor: "#ffffff", // 🔹 White border for better visibility
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "#ffffff", // 🔹 White color for indicators
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
});
