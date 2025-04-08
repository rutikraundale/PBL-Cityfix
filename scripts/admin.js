
window.onload = function () {
    let isadmin = localStorage.getItem("isadmin");
    if (isadmin !== "true") {
        alert("Unauthorizes Access Redirecting......");
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
        problems: getregproblem(),
        analytics: getanalytics(),
        adminC: getadmincontrol(),
        feedback: getfeedback(),
    };
    document.getElementById("main-content").innerHTML = content[section] || `
        <h2>Welcome to administration page</h2>
        <p>Select the option from the menu</p>
    `;

}
function getlocation(lat, long) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
    window.open(url, '_blank');
  }
  


function getregproblem() {
    let Complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    if (Complaints.length === 0) {
        return `<h2>Registered Complaints</h2><p>No complaints registered yet.</p>`;
    }

    let table = `
          <h2>Registered Complaints</h2>
          <table border="1" style="width: 100%; border-collapse: collapse; font-family: Arial;overflow-x: scroll;">
            <tr style="background-color: #333; color: white; overflow-x: scroll; height:40px;">
              <th style="padding=10px;">Application ID</th>
              <th style="padding=10px;">Name</th>
              <th style="padding=10px;">Email</th>
              <th style="padding=10px;">Mobile No</th>
              <th style="padding=10px;">Category</th>
              <th style="padding=10px;">Department</th>
              <th style="padding=10px;">Area</th>
              <th style="padding=10px;">Location</th>
              <th style="padding=10px;">Pincode</th>
              <th style="padding=10px;">Description</th>
              <th style="padding=10px;" >Status</th>
            </tr>
        `;
    
    
   

    Complaints.forEach((c) => {
        table += `
            <tr overflow-x: scroll;>
              <td style="padding: 10px; border: 1px solid #ccc;">${c.applicationID}</td>
              <td style="padding: 10px; border: 1px solid #ccc;">${c.name}</td>
              <td style="padding: 10px; border: 1px solid #ccc;">${c.email}</td>
              <td style="padding: 10px; border: 1px solid #ccc;">${c.mobile}</td>
              <td style="padding: 10px; border: 1px solid #ccc;">${c.category}</td>
              <td style="padding: 10px; border: 1px solid #ccc;">${c.department}</td>
              <td style="padding: 10px; border: 1px solid #ccc;">${c.area}</td>
              <td style="padding: 10px; border: 1px solid #ccc;">
                 ${
                     c.location && c.location.Lat && c.location.Long
                    ? `<button onclick="getlocation(${c.location.lat}, ${c.location.long})">Get Location</button>`
                    : "NA"
             }
                </td>
              <td style="padding: 10px; border: 1px solid #ccc;">${c.pincode}</td>
              <td style="padding: 10px; border: 1px solid #ccc;">${c.description}</td>
              <td style="padding: 10px; border: 1px solid #ccc; color:red";>${c.status}</td>
            </tr>
          `;
    });

    table += `</table>`;
    return table;
}

function getanalytics(){
    return `
     <h2>Soon Will be displaying Messages</h2>
    `;
}
function getadmincontrol(){
    return `
        <h2>Soon the data will published</h2>
    `;
}
function getfeedback(){
    
    let feedback=JSON.parse(localStorage.getItem("feedback")) || []
    if(feedback.length===0){
        return `
        <h2>No Feedback Submitted Yet!</h2>
        `
        
    };
    let table=`
        <h2>Feeback Details</h2>
        <table border="1" style="width: 100%; border-collapse: collapse; font-family: Arial; overflow-x: scroll;">
        <tr  style="background-color: #333; color: white;overflow-x: scroll;">
        <th style="padding: 10px;">Name</th>
        <th style="padding: 10px;">Email ID</th>
        <th style="padding: 10px;">Feedback</th>
        
        </tr>
        
    `;
    feedback.forEach(c=>{
        table+=`
            <tr>
            <td style="padding: 10px; border: 1px solid #ccc;" >${c.name}</td>
            <td style="padding: 10px; border: 1px solid #ccc;">${c.email}</td>
            <td style="padding: 10px; border: 1px solid #ccc;">${c.message}</td>
            </tr>
        `;

    
    });
    table+=`</table>`
    return table;
}