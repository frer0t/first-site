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
const blogId = JSON.parse(localStorage.getItem('singleblog'));
(async () => {
    const response = await fetch(`http://localhost:2000/api/blog/${blogId}`);
    const data = await response.json();
    body.style.overflowY = 'unset';
    loader.style.display = 'none';
    img1.src = data.img1;
    img2.src = data.img2;
    title.textContent = data.title;
    thename.textContent = data.title;
    const date = new Date(data.createdAt);
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
    likes.textContent = data.likes;
})();
window.onload = function () {
    title.style.opacity = 1;
};
inputSub.addEventListener('focus', removeErrorInput);

/// Subscriber

btnSub.addEventListener('click', async (e) => {
    e.preventDefault();
    if (inputSub.value === "" || !emailRegex.test(inputSub.value)) {
        inputSub.classList.add('animatein');
    } else {
        inputSub.disabled = true;
        btnSub.disabled = true;
        await fetch('http://localhost:2000/api/sub', {
            method: "post", headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ subscriber: inputSub.value })
        })
            .then(() => {
                inputSub.disabled = false;
                btnSub.disabled = false;
                inputSub.value = "";
                alert("Subscribed Successfully Check Your Inbox");
            });
    }
});

inputEmail.addEventListener('focus', removeErrorInput);
inputName.addEventListener('focus', removeErrorInput);
textMessage.addEventListener('focus', removeErrorInput);

// Post comment functionality;
const postFunctionality = async function (e) {
    e.preventDefault();
    if (inputEmail.value !== '' && emailRegex.test(inputEmail.value) && inputName.value !== '' && textMessage.value !== '') {
        const comment = {
            email: inputEmail.value,
            name: inputName.value,
            comment: textMessage.value
        };
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
        commentSect.insertAdjacentHTML('beforeend', html);
        inputEmail.value = '';
        inputName.value = '';
        textMessage.value = '';
        textMessage.classList.remove('animatein');
        inputEmail.classList.remove('animatein');
        inputName.classList.remove('animatein');
        await fetch(`http://localhost:2000/comment/new/${blogId}`, {
            method: "POST", headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment),
        });
    } else {
        if (inputEmail.value === '' || !emailRegex.test(inputEmail.value)) {
            inputEmail.value = '';
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
svglike.addEventListener('click', async function (e) {
    svglike.classList.toggle('addlike');
    !svglike.classList.contains('addlike') ? likescount.textContent-- : likescount.textContent++;
    if (svglike.classList.contains('addlike')) {
        localStorage.setItem('liked', JSON.stringify(true));
    } else {
        localStorage.setItem('liked', JSON.stringify(false));
    }
    const likes = likescount.textContent;
    await fetch(`http://localhost:2000/like/${blogId}`, {
        method: "POST", headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            likes: Number(likes)
        }),
    });
});




// You may so like

// getDocs(blogsCol).then(data => {
//     const blogs = [];
//     data.docs.forEach((doc) => {
//         blogs.push({ ...doc.data(), id: doc.id });
//     });
// if (blogs.length <= 1) {
//     likeAlsoSec.style.display = 'none';
//     likealsoh1.style.display = 'none';
// } else {
//     blogs.forEach(blog => {
//         const html4 = `<div  class="card">
//     <a data-id='${blog.id}' href="blog.html">${blog.title}</a>
//     </div>`;
//         if (blog.id !== JSON.parse(localStorage.getItem('singleblog'))) {
//             likeAlsoSec.insertAdjacentHTML('afterbegin', html4);
//         }
//     });
// }
// });
(async () => {
    let blogsData;
    try {
        const response = await fetch('http://localhost:2000/api/blogs');
        const data = await response.json();
        blogsData = [...data];
    } catch (error) {
        console.log(error);
    }
    if (blogsData.length <= 1) {
        likeAlsoSec.style.display = 'none';
        likealsoh1.style.display = 'none';
    } else {
        blogsData.forEach(blog => {
            const html4 = `<div  class="card">
        <a data-id='${blog._id}' href="blog.html">${blog.title}</a>
        </div>`;
            if (blog._id !== JSON.parse(localStorage.getItem('singleblog'))) {
                likeAlsoSec.insertAdjacentHTML('afterbegin', html4);
            }
        });
    }
})();
likeAlsoSec.addEventListener('click', function (e) {
    const blogPage = e.target;
    const blogId = blogPage.dataset.id;
    localStorage.setItem('singleblog', JSON.stringify(blogId));
});