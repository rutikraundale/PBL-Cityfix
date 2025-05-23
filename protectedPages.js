

document.addEventListener("DOMContentLoaded", () => {
    const protectedPages = ["complaint.html", "application.html", "disc.html", "analytics.html"];
    const currentPage = window.location.pathname.split("/").pop();
    console.log("Current Page:", currentPage);

    onAuthStateChanged(auth, (user) => {
        if (!user && protectedPages.includes(currentPage)) {
            alert("You must be logged in to access this page!");
            window.location.href = "login.html";
        }
    });
});
