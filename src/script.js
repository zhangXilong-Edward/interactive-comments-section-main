const container = document.querySelector('#container');
const commentsDiv = document.querySelector('#comment');
const currentUserInputArea = document.querySelector('#current-user-comment');


function appendData(data) {
  //get and append the current user profile 
  currentUserInputArea.innerHTML = `
    <form action="">
      <textarea type="text" name="text" class="current-user-comment-text" placeholder="Add a comment..."></textarea>
      <div class="user-send">
        <img src="${data.currentUser.image.png}" alt="avatar">
        <button type="button" class="submit-btn">SEND</button>
      </div>
    </form>
   `;
  //populate the comment section
  for (let i = 0; i < data.comments.length; i++) {
    let eachComment = document.createElement('div');
    eachComment.innerHTML = `
        <div class="individualComment">
          <div class="heading">
            <img src="${data.comments[i].user.image.png}" alt="avatar">
            <span class="name">${data.comments[i].user.username}</span>
            <span class="time">${data.comments[i].createdAt}</span>
          </div>
          <div class="content">
            <p>${data.comments[i].content}</p>
          </div>
          <div class="comment-footer">
            <div class="scoreButton">
              <img src="images/icon-plus.svg" alt="upvote">
              <span class="score">&nbsp; ${data.comments[i].score} &nbsp;</span>
              <img src="images/icon-minus.svg" alt="downvote">
            </div>
            <div class="reply-btn-wrapper">
              <img src="images/icon-reply.svg" alt="reply">
              <button type="button" class="reply-btn">Reply</button>
            </div>
          </div>
      </div>
        `;
    commentsDiv.append(eachComment);

    for (let j = 0; j < data.comments[i].replies.length; j++) {
      let replies = document.createElement('div');
      replies.innerHTML = `
       <div class="replies-wrapper">
        <div class="replies">
        <div class="heading">
        <img src="${data.comments[i].replies[j].user.image.png}" alt="avatar">
          <span class="name">${data.comments[i].replies[j].user.username}</span>
          <span class="time">${data.comments[i].replies[j].createdAt}</span>
        </div>
        <div class="content">
          <p>
          <span class="tag">&#64;${data.comments[i].replies[j].replyingTo}</span>
          ${data.comments[i].replies[j].content}
          </p>
        </div>
        <div class="comment-footer">
          <div class="scoreButton">
            <img src="images/icon-plus.svg" alt="upvote">
            <span class="score">&nbsp; ${data.comments[i].replies[j].score} &nbsp;</span>
            <img src="images/icon-minus.svg" alt="downvote">
          </div>
          <div class="reply-btn-wrapper">
            <img src="images/icon-reply.svg" alt="reply">
           <button type="button" class="reply-btn">Reply</button>
          </div>
        </div>
        </div>
       </div>
        `;
      eachComment.append(replies);
    }
  }
}

// Function to add a new comment
function addComment(data) {
  const sendBtns = document.querySelectorAll('.submit-btn');

  sendBtns.forEach((submitBtn) => {
    submitBtn.addEventListener('click', () => {
      console.log('click');
      let commentInput = document.querySelectorAll('.current-user-comment-text')[0].value;
      console.log(commentInput);

      const currentUserNewComment = document.createElement('div');
      currentUserNewComment.innerHTML = `
      <div class="individualComment">
      <div class="heading">
            <img src="${data.currentUser.image.png}" alt="avatar">
            <span class="name">${data.currentUser.username}</span>
            <span class="time">Just Now</span>
          </div>
          <div class="content">
            <p>${commentInput}</p>
          </div>
          <div class="comment-footer" >
            <div class="scoreButton">
              <img src="images/icon-plus.svg" alt="upvote">
              <span class="score">&nbsp; 0 &nbsp;</span>
              <img src="images/icon-minus.svg" alt="downvote">
            </div>
            <div class="reply-btn-wrapper">
              <img src="images/icon-reply.svg" alt="reply">
              <button type="button" class="reply-btn">Reply</button>
            </div>
          </div>
          </div>
      `;
      commentsDiv.append(currentUserNewComment);
      document.querySelectorAll('.current-user-comment-text')[0].value = '';
    })
  })
}

// Function to add a reply to a comment
function addReply() {

}

fetch('../data.json')
  .then((response) => {
    return response.json();
  }) //response.json() returns a promise - so we can now use another .then() to get the value,
  .then((data) => {
    appendData(data);
    addComment(data); 
    //addReply(data);
  })
  .catch((err) => {
    console.log(err);
  });

