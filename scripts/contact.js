document.getElementById("sub-btn").addEventListener("click",function(event){
    event.preventDefault();

    let name=document.getElementById("name").value.trim();
    let email=document.getElementById("email").value.trim();
    let message=document.getElementById("message").value.trim();

    function savefeed(){
        let feeddata={
            name:name,
            email:email,
            message:message
        };

        let feedback=JSON.parse(localStorage.getItem("feedback"))||[]
        feedback.push(feeddata);
        localStorage.setItem("feedback",JSON.stringify(feedback));
        alert("Feeback Submitted Successfully!");
        document.querySelector("form").reset();
    }
    savefeed();
}); 