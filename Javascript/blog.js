import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, getDoc, getDocs, collection, query, onSnapshot, doc, updateDoc, arrayUnion } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCHHyJJfqNFz5G2r9Ohsdc__fzz8bg6Y9c",
    authDomain: "my-brand-frontend.firebaseapp.com",
    projectId: "my-brand-frontend",
    storageBucket: "my-brand-frontend.appspot.com",
    messagingSenderId: "23360536523",
    appId: "1:23360536523:web:e255e314c23f4298a9404e"
};
initializeApp(firebaseConfig);
const db = getFirestore();
const subsColRef = doc(db, 'subscribers', 'xBecjxrnuTWLOMY43IDh');
const blogRef = doc(db, 'blogs', JSON.parse(localStorage.getItem('singleblog')));
const blogsCol = collection(db, 'blogs');
const title = document.querySelector('.title');
const body = document.querySelector('body');
const commentSect = document.querySelector('.comments');
const comments = document.querySelectorAll('.comment');
const btnPost = document.querySelector('.post');
const likeDiv = document.querySelector('.like');
const svglike = likeDiv.querySelector('svg');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const textMessage = document.querySelector('#thecommentin');
const likescount = document.querySelector('.likes');
const commentCount = document.querySelector('.comment-count');
const inputSub = document.getElementById('subscribe');
const loader = document.querySelector('.loading');
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const dates = document.querySelector('.date');
const months = document.querySelector('.month');
const thename = document.querySelector('.thename');
const fullText = document.querySelector('.fulltext');
const likes = document.querySelector('.likes');
const btnSub = document.querySelector('.sub');
const likeAlsoSec = document.querySelector('.cards');
const likealsoh1 = document.querySelector('.likealsoh1');
const emailRegex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,}$/;
// Removes error class
const removeErrorInput = function () {
    this.classList.remove('animatein');
};

getDoc(blogRef).then(doc => {
    const data = doc.data();
    body.style.overflowY = 'unset';
    loader.style.display = 'none';
    img1.src = data.image1;
    img2.src = data.image2;
    title.textContent = data.title;
    thename.textContent = data.title;
    const { seconds, nanoseconds } = data.thedate;
    const timeStamp_float = seconds + nanoseconds / (10 ** 9);
    const date = new Date(timeStamp_float * 1000);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    dates.textContent = day;
    let themonth;
    switch (month) {
        case '01':
            themonth = 'Jan';
            break;
        case '02':
            themonth = 'Feb';
            break;
        case '03':
            themonth = 'Mar';
            break;
        case '04':
            themonth = 'Apr';
            break;
        case '05':
            themonth = 'May';
            break;
        case '06':
            themonth = 'Jun';
            break;
        case '07':
            themonth = 'Jul';
            break;
        case '08':
            themonth = 'Aug';
            break;
        case '09':
            themonth = 'Sept';
            break;
        case '10':
            themonth = 'Oct';
            break;
        case '11':
            themonth = 'Nov';
            break;
        case '12':
            themonth = 'Dec';
            break;
    }
    const subtitle = data.subtitle;
    fullText.insertAdjacentHTML('afterbegin', `<p class="text">${subtitle}</p>`);
    months.textContent = themonth;
    const text = data.body.split('\n');
    text.forEach(element => {
        const html = `<p class="text">${element}</p>`;
        if (element.length > 2) {
            element.trim();
            if (element.length < 100) {
                const html2 = `<p class="text quote">${element}</p>`;
                fullText.insertAdjacentHTML('beforeend', html2);
            } else {

                fullText.insertAdjacentHTML('beforeend', html);
            }
        }
    });
    likes.textContent = data.likes;
    data.comments.forEach((comment) => {
        const hmtl3 = `<div class="comment">
       <img src="/Assets/profile-comment.png"  />
       <div class="themessage">
        <p class="guest">${comment.name}</p>
        <p class="message">${comment.comment}</p>
       </div>
      </div>`;
        commentSect.insertAdjacentHTML('beforeend', hmtl3);
    });
    commentCount.textContent = data.comments.length;
});

inputSub.addEventListener('focus', removeErrorInput);
/// Subscriber
btnSub.addEventListener('click', function (e) {
    e.preventDefault();
    if (inputSub.value === "" || !emailRegex.test(inputSub.value)) {
        inputSub.classList.add('animatein');
    } else {
        updateDoc(subsColRef, { emails: arrayUnion(inputSub.value) }).then(() => {
            inputSub.value = '';
            setTimeout(() => {
                alert('Successfully Subscribed');
            }, 800);
        });
    }
});

// Comments updating
let commentsnum = comments.length;
commentCount.textContent = commentsnum;

updateDoc(blogRef, {
    comment: Number(commentsnum)
});
inputEmail.addEventListener('focus', removeErrorInput);
inputName.addEventListener('focus', removeErrorInput);
textMessage.addEventListener('focus', removeErrorInput);

// Post comment functionality;
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
        commentCount.textContent++;
        updateDoc(blogRef, {
            comment: Number(commentCount.textContent),
            comments: arrayUnion({ name: inputName.value, email: inputEmail.value, comment: textMessage.value })
        });
        commentSect.insertAdjacentHTML('beforeend', html);
        inputEmail.value = '';
        inputName.value = '';
        textMessage.value = '';
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
if (JSON.parse(localStorage.getItem('liked'))) {
    svglike.classList.add('addlike');
}
svglike.addEventListener('click', function (e) {
    svglike.classList.toggle('addlike');
    !svglike.classList.contains('addlike') ? likescount.textContent-- : likescount.textContent++;
    if (svglike.classList.contains('addlike')) {
        localStorage.setItem('liked', JSON.stringify(true));
    } else {
        localStorage.setItem('liked', JSON.stringify(false));
    }
    updateDoc(blogRef, {
        likes: Number(likescount.textContent)
    });
});

window.onload = function () {
    title.style.opacity = 1;
};


// You may so like

getDocs(blogsCol).then(data => {
    const blogs = [];
    data.docs.forEach((doc) => {
        blogs.push({ ...doc.data(), id: doc.id });
    });
    if (blogs.length <= 1) {
        likeAlsoSec.style.display = 'none';
        likealsoh1.style.display = 'none';
    } else {
        blogs.forEach(blog => {
            const html4 = `<div  class="card">
        <a data-id='${blog.id}' href="blog.html">${blog.title}</a>
        </div>`;
            if (blog.id !== JSON.parse(localStorage.getItem('singleblog'))) {
                likeAlsoSec.insertAdjacentHTML('afterbegin', html4);
            }
        });
    }
});
likeAlsoSec.addEventListener('click', function (e) {
    const blogPage = e.target;
    const blogId = blogPage.dataset.id;
    localStorage.setItem('singleblog', JSON.stringify(blogId));
});