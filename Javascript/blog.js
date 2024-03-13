

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
const formSub = document.querySelector('.subscribe');
const inputSub = document.getElementById('subscribe');
const btnSub = document.querySelector('.sub');
const emailRegex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,}$/;



// Removes error class
const removeErrorInput = function () {
    this.classList.remove('animatein');
};

inputSub.addEventListener('focus', removeErrorInput);

btnSub.addEventListener('click', function (e) {
    if (inputSub.value === "" || !emailRegex.test(inputSub.value)) {
        e.preventDefault();
        inputSub.classList.add('animatein');
    }
});





let commentsnum = comment.length;

commentCount.textContent = commentsnum;


inputEmail.addEventListener('focus', removeErrorInput);
inputName.addEventListener('focus', removeErrorInput);
textMessage.addEventListener('focus', removeErrorInput);

// Post comment functionality 
const postFunctionality = function (e) {
    e.preventDefault();
    if (inputEmail.value !== '' && emailRegex.test(inputEmail.value) && inputName.value !== '' && textMessage.value !== '') {
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

        if (inputEmail.value === '' || !emailRegex.test(inputEmail.value)) {
            inputEmail.classList.add('animatein');
        }
        if (inputName.value === '') {
            inputName.classList.add('animatein');
        }
        if (textMessage.value === '') {
            textMessage.classList.add('animatein');
        }

    }
};
btnPost.addEventListener('click', postFunctionality);

// Like functionality 
svglike.addEventListener('click', function () {
    svglike.classList.toggle('addlike');
    !svglike.classList.contains('addlike') ? likescount.textContent-- : likescount.textContent++;
});


window.onload = function () {
    title.style.opacity = 1;
};