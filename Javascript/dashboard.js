import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, getDocs, onSnapshot, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
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
const blogsColRef = collection(db, 'blogs');
const subsColRef = doc(db, 'subscribers', 'xBecjxrnuTWLOMY43IDh');
const messagesColRef = collection(db, 'messages');
const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");
const dashboard = document.querySelector('.dashboard');
const articles = document.querySelector('.articles');
const queries = document.querySelector('.queries');
const subsSec = document.querySelector('.subs');

window.onload = function () {
    dashboard.style.opacity = 1;
    dashboard.style.transform = 'translateY(0)';
};
const mobileLinks = mobilenav.childNodes;

mobileLinks.forEach(cur => cur.addEventListener('click', function () {
    bar1.classList.toggle("animatebar1");
    bar2.classList.toggle("animatebar2");
    bar3.classList.toggle("animatebar3");
    mobilenav.classList.toggle("opendrawer");
}));

humburger.addEventListener("click", function () {
    bar1.classList.toggle("animatebar1");
    bar2.classList.toggle("animatebar2");
    bar3.classList.toggle("animatebar3");
    mobilenav.classList.toggle("opendrawer");
});
// Adding recent Blogs
onSnapshot(blogsColRef, (snapshot) => {
    let blogs = [];
    snapshot.docs.forEach((blog) => {
        if (blogs.length < 5) {
            blogs.push({ ...blog.data(), id: blog.id });
        }
    });

    blogs.forEach(cur => {
        const { seconds, nanoseconds } = cur.thedate;
        const timeStamp_float = seconds + nanoseconds / (10 ** 9);
        const date = new Date(timeStamp_float * 1000);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const outputDate = `${day}/${month}/${date.getFullYear()}`;
        const html = `<article>
       <p class="time-date">${outputDate}</p>
       <div class="art">
        <img src="${cur.image1}" />
        <p>${cur.title}</p>
       </div>
       <div class="actions">
        <a class="edit" data-id="${cur.id}" ><svg
        class="edit"
        data-id="${cur.id}"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="fill: rgba(0, 0, 0, 1)"
         >
          <path
          data-id="${cur.id}"
          class="edit"
           d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"
          ></path>
          <path
           d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"
          ></path>
         </svg>
        </a>
        <a class="delete" data-id="${cur.id}"
         ><svg
         class="delete"
         data-id="${cur.id}"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="red"
          class="w-6 h-6"
         >
          <path
          class="delete"
          data-id="${cur.id}"
           stroke-linecap="round"
           stroke-linejoin="round"
           d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
         </svg>
        </a>
       </div>
      </article>`;
        articles.insertAdjacentHTML('afterbegin', html);
    });
});

// Adding recent Queries

getDocs(messagesColRef).then(snapshot => {
    let messages = [];
    snapshot.docs.forEach(message => {
        if (messages.length < 5) {
            messages.push({ ...message.data(), id: message.id });
        }
    });
    messages.forEach(cur => {
        const html2 = `<div class="querie">
      <div class="sender-dt">
       <p class="sender-name">${cur.guest}</p>
       <a href="mailto:${cur.guestemail}" class="sender-mail">${cur.guestemail}</a>
      </div>
      <p class="message">${cur.message}</p>
     </div>`;
        queries.insertAdjacentHTML('beforeend', html2);
    });
});

// Adding SubsList

onSnapshot(subsColRef, snapshot => {
    const subs = snapshot.data().emails;
    subs.forEach((sub, i) => {
        const html3 = `<p class="sub">${sub}
       <a href='' data-id='${i}' class="remove"
        ><svg
        data-id='${i}' class="remove"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke-width="1.5"
         stroke="red"
         class="w-6 h-6"
        >
         <path
         data-id='${i}' class="remove"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
         />
        </svg>
       </a>
      </p>`;
        subsSec.insertAdjacentHTML('afterbegin', html3);
    });
});

// Deleting Blog

articles.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        if (confirm('Are you Sure you i want to delete The Blog')) {
            const deleteButton = event.target;
            const deleteId = deleteButton.dataset.id;
            const blogRef = doc(db, 'blogs', deleteId);
            deleteDoc(blogRef).then(() => {
                alert('Deleteted Successfully');
                window.location.reload();
            });
        }
    }
});

// Editing blog

articles.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit')) {
        const editButton = event.target;
        const editId = editButton.dataset.id;
        localStorage.setItem('blogEdit', JSON.stringify(editId));
        window.open('/html/updateblog.html', '_self');
    }
});