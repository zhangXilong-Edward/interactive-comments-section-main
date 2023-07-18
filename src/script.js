const container = document.querySelector('#container');


const appendData = (data) => {
    const currentuserInput = document.querySelector('#user-input');
    currentuserInput.innerHTML = `
        <input type="text">
        <div class="user-send" id="user-send">
            <img src="images/avatars/image-${data.currentUser.username}.png" alt="avatar" width='35px' height="auto">
            <button type="submit">SEND</button>
        </div>
   `;

    const commentArea = document.querySelector('#comment');
    for (let i = 0; i < data.comments.length; i++) {
        let eachComment = document.createElement('div');
        eachComment.innerHTML = `
        <div class="individualComment" id="individualComment">
        <div class="heading" id="heading">
          <img src="images/avatars/image-amyrobson.png" alt="avatar">
          <span class="name">Name</span>
          <span class="time">Time stamp</span>
        </div>
        <p class="content">content</p>
        <div class="commentFooter" id="commentFooter">
          <div class="scoreButton" id="scoreButton">
            <img src="images/icon-plus.svg" alt="upvote">
            <span class="score">&nbsp; 15 &nbsp;</span>
            <img src="images/icon-minus.svg" alt="downvote">
          </div>
          <div class="reply">
            <img src="images/icon-reply.svg" alt="reply">
            &nbsp; Reply
          </div>
        </div>
      </div>
        `;
    }
}


fetch('../data.json')
    .then((response) => {
        return response.json();
    })
    //response.json() returns a promise! 
    //so we can now use another .then() to get the value, i.e. the actual data in the data.json file
    .then((data) => {
        // appendData(data);
        console.log(data);
        console.log(data.currentUser.username);
        console.log(data.comments)

    })
    //appendData would be the main function that we write the append the data to HTML
    .catch((err) => {
        console.log(err);
    });