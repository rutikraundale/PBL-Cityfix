document.getElementById("sub-btn").addEventListener('click',function(event){
    event.preventDefault();
    let name=document.getElementById('name').value.trim();
    let phone=document.getElementById('mobile').value.trim();
    let email=document.getElementById('email').value.trim();
    let type=document.getElementById('comp').value.trim();
    let message=document.getElementById('prob').value.trim();
    function sumbitform(){
        let feedbackform={
            name:name,
            phone:phone,
            email:email,
            type:type,
            message:message
        };

        let feedbacknew=JSON.parse(localStorage.getItem("feedbacknew"))||[]
        feedbacknew.push(feedbackform);
        localStorage.setItem("feedbacknew",JSON.stringify(feedbacknew));
        alert("Feeedback is submitted Successfully");
        window.location.href="home.html"
        document.querySelector("form").reset();
    }
    sumbitform();
});