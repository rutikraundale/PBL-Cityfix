document.addEventListener("DOMContentLoaded", function () {
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
                        legend: {
                            position: 'top',
                            labels: {
                                color: 'black', // <-- label color here
                                font: {
                                    size: 14,
                                    family: 'Arial',
                                    weight: 'bold'
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Complaint Status Overview',
                            color: 'black' // <-- title color
                        },
                        tooltip: {
                            bodyColor: 'black' // <-- tooltip text color
                        }
                    }
                }
            });
            
        }
    }
    initChart();
});
