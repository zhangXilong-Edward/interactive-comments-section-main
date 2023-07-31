const container = document.querySelector('#container');
const commentsDiv = document.querySelector('#comments');
const currentUserInputArea = document.querySelector('#current-user-comment');


function appendData(data) {
  //get and append the current user profile 
  currentUserInputArea.innerHTML = `
    <form action="">
      <textarea type="text" name="text" class="current-user-comment-text" placeholder="Add a comment..."></textarea>
      <div class="user-send-btn-wrapper">
        <img src="${data.currentUser.image.png}" alt="avatar">
        <button type="button" class="submit-btn">SEND</button>
      </div>
    </form>
   `;

  //populate the comment section
  for (let i = 0; i < data.comments.length; i++) {
    let eachComment = document.createElement('div');

    //if the current user then we need to give buttons for edit delete and the user tag
    if (data.currentUser.username == data.comments[i].user.username) {
      eachComment.innerHTML = `
      <div class="individualComment">
        <div class="heading">
          <img src="${data.comments[i].user.image.png}" alt="avatar">
          <span><span class="name">${data.comments[i].user.username}</span><span class="user-tag">You</span><span>
          <span class="time">${data.comments[i].createdAt}</span>
          <span class="delete" data-confirm="Are you sure to delete this item?">Delete</span>
          <span class="edit" >Edit</span>
        </div>
        <div class="content">
          <p>${data.comments[i].content}</p>
        </div>
        <div class="comment-footer">
          <div class="scoreButton">
            <img src="images/icon-plus.svg" alt="upvote" class="upvote">
            <span class="score"> ${data.comments[i].score} </span>
            <img src="images/icon-minus.svg" alt="downvote">
          </div>
          <div class="reply-btn-wrapper">
            <img src="images/icon-reply.svg" alt="reply" class="downvote">
            <button type="button" class="reply-btn">Reply</button>
          </div>
        </div>
    </div>
      `;
    } else {
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
            <img src="images/icon-plus.svg" alt="upvote" class="upvote">
            <span class="score">${data.comments[i].score}</span>
            <img src="images/icon-minus.svg" alt="downvote" class="downvote">
          </div>
          <div class="reply-btn-wrapper">
            <img src="images/icon-reply.svg" alt="reply">
            <button type="button" class="reply-btn">Reply</button>
          </div>
        </div>
    </div>
      `;
    }

    commentsDiv.append(eachComment);
    for (let j = 0; j < data.comments[i].replies.length; j++) {
      let replies = document.createElement('div');
      console.log(data.currentUser.username);
      console.log(data.comments[i].replies[j].user.username);
      if (data.currentUser.username == data.comments[i].replies[j].user.username) {

        replies.innerHTML = `
        <div class="replies-wrapper">
         <div class="replies">
          <div class="heading">
           <img src="${data.comments[i].replies[j].user.image.png}" alt="avatar">
           <span><span class="name">${data.comments[i].user.username}</span><span class="user-tag">You</span></span>
           <span class="time">${data.comments[i].replies[j].createdAt}</span>
           <span   class="delete" data-confirm="Are you sure to delete this item?" >Delete</span>
           <span class="edit" >Edit</span>
          </div>
          <div class="content">
          <p class="tag">&#64;${data.comments[i].replies[j].replyingTo}</p> 
           <p>
           ${data.comments[i].replies[j].content}
           </p>
          </div>
          <div class="comment-footer">
           <div class="scoreButton">
             <img src="images/icon-plus.svg" alt="upvote" class="upvote">
             <span class="score"> ${data.comments[i].replies[j].score}</span>
             <img src="images/icon-minus.svg" alt="downvote" class="downvote">
           </div>
           <div class="reply-btn-wrapper">
             <img src="images/icon-reply.svg" alt="reply">
            <button type="button" class="reply-btn">Reply</button>
           </div>
          </div>
         </div>
        </div>
         `;
      } else {
        replies.innerHTML = `
       <div class="replies-wrapper">
        <div class="replies">
        <div class="heading">
        <img src="${data.comments[i].replies[j].user.image.png}" alt="avatar">
          <span class="name">${data.comments[i].replies[j].user.username}</span>
          <span class="time">${data.comments[i].replies[j].createdAt}</span>
        </div>
        <div class="content">
        <p class="tag">&#64;${data.comments[i].replies[j].replyingTo}</p>
          <p>
          ${data.comments[i].replies[j].content}
          </p>
        </div>
        <div class="comment-footer">
          <div class="scoreButton">
            <img src="images/icon-plus.svg" alt="upvote" class="upvote">
            <span class="score"> ${data.comments[i].replies[j].score}</span>
            <img src="images/icon-minus.svg" alt="downvote" class="downvote">
          </div>
          <div class="reply-btn-wrapper">
            <img src="images/icon-reply.svg" alt="reply">
           <button type="button" class="reply-btn">Reply</button>
          </div>
        </div>
        </div>
       </div>
        `;
      }

      eachComment.append(replies);
    }
  }
}
// Function to add a new comment
function addComment(data) {
  const sendBtns = document.querySelectorAll('.submit-btn');
  sendBtns.forEach((submitBtn) => {
    submitBtn.addEventListener('click', (e) => {

      let commentInput = document.querySelectorAll('.current-user-comment-text')[0].value;
      console.log(commentInput);

      let repliedToDiv = e.target.parentNode.parentNode.parentNode;
      const currentUserNewComment = document.createElement('div');

      if (repliedToDiv.classList.contains('replies')) {
        currentUserNewComment.innerHTML = `
        <div class="replies">
         <div class="heading">
              <img src="${data.currentUser.image.png}" alt="avatar">
              <span><span class="name">${data.currentUser.username}</span><span class="user-tag">You</span></span>
              <span class="time">Just Now</span>
              <span   class="delete" data-confirm="Are you sure to delete this item?" >Delete</span>
              <span class="edit">Edit</span>
         </div>
         <div class="content">
         <p class="tag"></p> 
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
      } else {
        currentUserNewComment.innerHTML = `
        <div class="individualComment">
         <div class="heading">
              <img src="${data.currentUser.image.png}" alt="avatar">
              <span><span class="name">${data.currentUser.username}</span><span class="user-tag">You</span></span>
              <span class="time">Just Now</span>
              <span   class="delete" data-confirm="Are you sure to delete this item?" >Delete</span>
              <span class="edit">Edit</span>
         </div>
         <div class="content">
         <p class="tag"></p> 
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
      };





      commentsDiv.append(currentUserNewComment);
      document.querySelectorAll('.current-user-comment-text')[0].value = '';

      if (e.target.classList.contains('send-reply')) {
        const commentedToDiv = e.target.parentNode.parentNode.parentNode;
        console.log(commentedToDiv)
        commentedToDiv.parentNode.insertBefore(currentUserNewComment, commentedToDiv.nextSibling);
        commentedToDiv.remove();
      }

      deleteComment(data);
      editComment(data)

    })
  })

}
// Function to add a reply to a comment
function addReply(data) {
  const replyBtns = document.querySelectorAll('.reply-btn');

  replyBtns.forEach((e) => {
    e.addEventListener('click', (e) => {
      const replyDiv = document.createElement('div');
      let repliedToDiv = e.target.parentNode.parentNode.parentNode;

      console.log(data.currentUser.image.png)

      if (repliedToDiv.classList.contains('replies')) {
        replyDiv.innerHTML = `
        <div class="replies">
        <form>
         <textarea type="text" name="text" class="current-user-comment-text" placeholder="Add a reply..."></textarea>
         <div class="user-send-btn-wrapper">
          <img src="${data.currentUser.image.png}"alt="avatar">
          <button type="button" class="submit-btn send-reply">SEND REPLY</button>
         </div>
       </form>
       </div>
        `;
      } else {
        replyDiv.innerHTML = `
        <div class="individualComment">
        <form>
         <textarea type="text" name="text" class="current-user-comment-text" placeholder="Add a reply..."></textarea>
         <div class="user-send-btn-wrapper">
          <img src="${data.currentUser.image.png}" alt="avatar">
          <button type="button" class="submit-btn send-reply">SEND REPLY</button>
         </div>
       </form>
       </div>
        `;
      }
      repliedToDiv.insertAdjacentHTML("afterend", replyDiv.innerHTML);

      addComment(data);

    })
  })
}
function deleteComment() {
 console.log('delete is yet appplied'); 
}

function editComment() {
  const editBtns = document.querySelectorAll('.edit');
  editBtns.forEach((btn) => {
    console.log('edit clicked')

    btn.addEventListener('click', (e) => {

      console.log(e.target.parentNode.nextElementSibling.childNodes)
      console.log(e.target.parentNode.nextElementSibling.childNodes[3]);
      e.target.parentNode.nextElementSibling.childNodes[3].setAttribute('contenteditable', 'true');
      e.target.parentNode.nextElementSibling.childNodes[3].focus();

      const updateBtn = document.createElement('button');
      updateBtn.classList.add('update-btn');
      updateBtn.innerText = 'UPDATE';

      let updateBtnCheck = document.getElementsByClassName('update-btn');
      console.log(updateBtnCheck)
      if (updateBtnCheck.length == 0) {
        e.target.parentNode.nextElementSibling.append(updateBtn);
      }


      updateBtn.addEventListener('click', () => {
        e.target.parentNode.nextElementSibling.childNodes[3].setAttribute('contenteditable', 'false');
        updateBtn.remove();

      })
    })
  })
}

function upvote() {
  const upvoteBtns = document.querySelectorAll('.upvote');
  const downvoteBtns = document.querySelectorAll('.downvote');

  upvoteBtns.forEach((e) => {
    e.addEventListener('click', (e) => {
      let scoreCurrent = e.target.nextElementSibling.innerText;
      scoreCurrent++;
      e.target.nextElementSibling.innerHTML = `${scoreCurrent}`;
    })
  })
}

function downvote() {
  const downvoteBtns = document.querySelectorAll('.downvote');

  downvoteBtns.forEach((e) => {
    e.addEventListener('click', (e) => {
      let scoreCurrent = e.target.previousElementSibling.innerText;
      scoreCurrent--;
      e.target.previousElementSibling.innerText = scoreCurrent;
    })
  })
}

fetch('../data.json')
  .then((response) => {
    return response.json();
  }) //response.json() returns a promise - so we can now use another .then() to get the value,
  .then((data) => {
    appendData(data);
    addComment(data);
    addReply(data);
    deleteComment();
    editComment();
    upvote();
    downvote();
  })
  .catch((err) => {
    console.log(err);
  });

