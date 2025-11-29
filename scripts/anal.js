document.addEventListener("DOMContentLoaded", function () {
  let chartInstance = null;

  function initChart() {
    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    let pendingcnt = 0;
    let solvedcnt = 0;
    let rejectcnt = 0;

    complaints.forEach(c => {
      if (c.status === "Pending") pendingcnt++;
      else if (c.status === "Rejected") rejectcnt++;
      else if (c.status === "Solved") solvedcnt++;
    });

    const canvas = document.getElementById("myChart");
    if (!canvas) return;

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
          backgroundColor: [
            "rgba(234, 179, 8, 0.9)",   // Pending - amber
            "rgba(34, 197, 94, 0.9)",   // Solved - green
            "rgba(239, 68, 68, 0.9)"    // Rejected - red
          ],
          borderColor: [
            "rgba(234, 179, 8, 1)",
            "rgba(34, 197, 94, 1)",
            "rgba(239, 68, 68, 1)"
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#e5e7eb", // light grey for dark background
              font: {
                size: 14,
                family: "Poppins, system-ui, sans-serif",
                weight: "500"
              }
            }
          },
          title: {
            display: true,
            text: "Complaint Status Overview",
            color: "#f9fafb",
            font: {
              size: 16,
              weight: "600",
              family: "Poppins, system-ui, sans-serif"
            }
          },
          tooltip: {
            bodyColor: "#111827",
            titleColor: "#111827",
            backgroundColor: "#f9fafb",
            borderColor: "#4b5563",
            borderWidth: 1
          }
        }
      }
    });
  }

  initChart();
});
