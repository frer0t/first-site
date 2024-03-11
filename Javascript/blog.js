

const title = document.querySelector('.title');
const comments = document.querySelector('.comments');
const comment = document.querySelectorAll('.comment');
const btnPost = document.querySelector('.post');
const likeDiv = document.querySelector('.like');
const svglike = likeDiv.querySelector('svg');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const textMessage = document.querySelector('#thecommentin');
const likescount = document.querySelector('.likes');
const commentCount = document.querySelector('.comment-count');

let commentsnum = comment.length;
commentCount.textContent = commentsnum;
console.log(commentsnum);
btnPost.addEventListener('click', function (e) {
 e.preventDefault();
 if (inputEmail.value !== '' && inputName.value !== '' && textMessage.value !== '') {
  const html = `<div class="comment">
       <img src="/Assets/profile-comment.png" alt="" />
       <div class="themessage">
        <p class="guest">${inputName.value}</p>
        <p class="message">
         ${textMessage.value}
        </p>
       </div>
      </div>`;
  comments.insertAdjacentHTML('beforeend', html);

  inputEmail.value = '';
  inputName.value = '';
  textMessage.value = '';
  commentsnum++;
  commentCount.textContent = commentsnum;
  textMessage.classList.remove('animatein');
  inputEmail.classList.remove('animatein');
  inputName.classList.remove('animatein');
 } else {
  inputEmail.classList.add('animatein');
  inputName.classList.add('animatein');
  textMessage.classList.add('animatein');

 }
});


svglike.addEventListener('click', function () {
 svglike.classList.toggle('addlike');
 !svglike.classList.contains('addlike') ? likescount.textContent-- : likescount.textContent++;
});


window.onload = function () {
 title.style.opacity = 1;
};