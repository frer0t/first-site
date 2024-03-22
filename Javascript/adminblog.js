import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, onSnapshot, query, orderBy, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { getStorage, ref, deleteObject } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js';
const firebaseConfig = {
  apiKey: "AIzaSyCHHyJJfqNFz5G2r9Ohsdc__fzz8bg6Y9c",
  authDomain: "my-brand-frontend.firebaseapp.com",
  projectId: "my-brand-frontend",
  storageBucket: "my-brand-frontend.appspot.com",
  messagingSenderId: "23360536523",
  appId: "1:23360536523:web:e255e314c23f4298a9404e"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore();
const blogsColRef = collection(db, 'blogs');
const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");
const blogs = document.querySelector('.blogs');
const noBlogs = document.querySelector('.noblogs');
const deleteBlog = document.querySelector('.delete');

window.onload = function () {
  blogs.style.opacity = 1;
  blogs.style.transform = 'translateY(0)';
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

getDocs(blogsColRef).then(snapshot => {
  let blogsDocs = [];

  snapshot.docs.forEach((blog) => {
    blogsDocs.push({ ...blog.data(), id: blog.id });
  });
  if (blogsDocs.length >= 1) {
    noBlogs.style.display = 'none';
  }
  blogsDocs.forEach((cur) => {
    const { seconds, nanoseconds } = cur.thedate;
    const timeStamp_float = seconds + nanoseconds / (10 ** 9);
    const date = new Date(timeStamp_float * 1000);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const outputDate = `${day} ${month} ${date.getFullYear()}`;
    const html = `<div class="blogcard">
        <img src="${cur.image1}"/>
        <div class="alldes">
        <p class="date">${outputDate}</p>
        <h3><a class="topic">${cur.title}</a></h3>
        <p class="blog-text">${cur.subtitle}</p>
        <div class="reactions">
        <div class="like">
        <svg width="100" height="100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="none" />
        <path stroke="black" stroke-width="1" 
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
       </svg>
       <p class="likes">${cur.likes}</p>
      </div>
      <div class="comment">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
         d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
        />
       </svg>
       <p class="comments">${cur.comment}</p>
       </div><div class="actions">
       <a class="edit" data-id='${cur.id}' ><svg
       data-id='${cur.id}'
        class="edit"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
         height="24"
         viewBox="0 0 24 24"
         style="fill: rgba(0, 0, 0, 1)"
        >
        <path
        class="edit"
          data-id='${cur.id}'
          d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"
         ></path>
         <path
         d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"
         ></path>
        </svg>
        </a>
        <a data-id='${cur.id}' class="delete"
        ><svg
        class="delete"
        data-id='${cur.id}'
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke-width="1.5"
         stroke="red"
         class="w-6 h-6"
         >
         <path
         class="delete"
         data-id='${cur.id}'
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
         />
        </svg>
       </a>
      </div>
      </div>
      </div>
   </div>`;
    blogs.insertAdjacentHTML('afterbegin', html);

  });
});
// Deleting blogs
blogs.addEventListener('click', function (event) {
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

// Editing Blog
blogs.addEventListener('click', function (event) {
  if (event.target.classList.contains('edit')) {
    const editButton = event.target;
    const editId = editButton.dataset.id;
    localStorage.setItem('blogEdit', JSON.stringify(editId));
    window.open('/html/updateblog.html', '_self');
  }
});