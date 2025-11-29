document.addEventListener("DOMContentLoaded", function () {
  // 🔒 Require login
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || !user.name) {
    alert("Please log in to access the discussion board.");
    window.location.href = "login.html";
    return;
  }

  const commentsList = document.getElementById("commentsList");
  const commentInputEl = document.getElementById("commentInput");
  const postCommentBtn = document.getElementById("postComment");

  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  function saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  function formatDate(timestamp) {
    const d = new Date(timestamp);
    return d.toLocaleString(); // you can customize if you want
  }

  function displayComments() {
    commentsList.innerHTML = "";

    comments.forEach((comment, index) => {
      // ensure structure
      comment.replies = comment.replies || [];
      comment.likes = comment.likes || 0;
      comment.dislikes = comment.dislikes || 0;
      comment.timestamp = comment.timestamp || Date.now();

      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");

      commentDiv.innerHTML = `
        <div class="comment-header">
          <span class="comment-user">${comment.user}</span>
          <span class="comment-date">${formatDate(comment.timestamp)}</span>
        </div>
        <div class="comment-text">
          ${comment.text}
        </div>
        <div class="comment-actions">
          <button class="action-btn like-btn" data-index="${index}">
            👍 <span>${comment.likes}</span>
          </button>
          <button class="action-btn dislike-btn" data-index="${index}">
            👎 <span>${comment.dislikes}</span>
          </button>
        </div>
        <div class="replies">
          ${comment.replies
            .map(
              reply =>
                `<div class="reply-item"><strong>${reply.user}:</strong> ${reply.text}</div>`
            )
            .join("")}
        </div>
        <textarea class="reply-input" placeholder="Write a reply..."></textarea>
        <button class="reply-btn" data-index="${index}">Post Reply</button>
      `;

      commentsList.appendChild(commentDiv);
    });

    attachInnerHandlers();
  }

  function attachInnerHandlers() {
    // Like buttons
    document.querySelectorAll(".like-btn").forEach(btn => {
      btn.onclick = function () {
        const idx = parseInt(this.dataset.index, 10);
        comments[idx].likes = (comments[idx].likes || 0) + 1;
        saveComments();
        displayComments();
      };
    });

    // Dislike buttons
    document.querySelectorAll(".dislike-btn").forEach(btn => {
      btn.onclick = function () {
        const idx = parseInt(this.dataset.index, 10);
        comments[idx].dislikes = (comments[idx].dislikes || 0) + 1;
        saveComments();
        displayComments();
      };
    });

    // Reply buttons
    document.querySelectorAll(".reply-btn").forEach(btn => {
      btn.onclick = function () {
        const idx = parseInt(this.dataset.index, 10);
        const replyInputs = document.querySelectorAll(".reply-input");
        const replyText = replyInputs[idx].value.trim();

        if (!replyText) {
          alert("Reply cannot be empty!");
          return;
        }

        comments[idx].replies = comments[idx].replies || [];
        comments[idx].replies.push({
          user: user.name,
          text: replyText
        });

        saveComments();
        displayComments();
      };
    });
  }

  // Post new comment
  if (postCommentBtn) {
    postCommentBtn.addEventListener("click", function () {
      const text = commentInputEl.value.trim();
      if (!text) {
        alert("Comment cannot be empty!");
        return;
      }

      comments.push({
        user: user.name,
        text: text,
        replies: [],
        likes: 0,
        dislikes: 0,
        timestamp: Date.now()
      });

      saveComments();
      commentInputEl.value = "";
      displayComments();
    });
  }

  // Initial render
  displayComments();
});
