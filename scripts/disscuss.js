document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("loggedInUser")); // Parse the user object
    if (!user || !user.name) {  // Check if user exists and has a name
        alert("Please log in to access the discussion board.");
        window.location.href = "login.html";
        return;
    }

    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let commentsList = document.getElementById("commentsList");

    function displayComments() {
        commentsList.innerHTML = "";
        comments.forEach((comment, index) => {
            comment.replies = comment.replies || [];

            let commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
            commentDiv.innerHTML = `
                <p><strong>${comment.user}</strong></p>
                <p>${comment.text}</p>
                
                <div class="replies">
                    ${comment.replies.map(reply => `<p><strong>${reply.user}:</strong> ${reply.text}</p>`).join("")}
                </div>
                <textarea class="replyInput" placeholder="Write a reply..."></textarea>
                <button onclick="postReply(${index})">Post Reply</button>
            `;
            commentsList.appendChild(commentDiv);
        });
    }

    document.getElementById("postComment").addEventListener("click", function () {
        let commentInput = document.getElementById("commentInput").value.trim();
        if (commentInput === "") {
            alert("Comment cannot be empty!");
            return;
        }
        comments.push({ user: user.name, text: commentInput, replies: [] }); // Use only user.name
        localStorage.setItem("comments", JSON.stringify(comments));
        document.getElementById("commentInput").value = "";
        displayComments();
    });

    window.postReply = function (index) {
        let replyInput = document.querySelectorAll(".replyInput")[index].value.trim();
        if (replyInput === "") {
            alert("Reply cannot be empty!");
            return;
        }
        comments[index].replies = comments[index].replies || [];
        comments[index].replies.push({ user: user.name, text: replyInput }); // Use only user.name
        localStorage.setItem("comments", JSON.stringify(comments));
        displayComments();
    };

    displayComments();
});