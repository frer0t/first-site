import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, onSnapshot, doc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
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
const messagesCol = collection(db, 'messages');
const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");
const messagesSec = document.querySelector('.messages');
const noMessages = document.querySelector('.noMessages');
window.onload = function () {
 messagesSec.style.opacity = 1;
 messagesSec.style.transform = 'translateY(0)';
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

onSnapshot(messagesCol, snapshot => {
 let all = [];
 snapshot.docs.forEach(message => {
  noMessages.style.display = 'none';
  all.push({ ...message.data(), id: message.id });
 });
 all.forEach(cur => {
  const html = `<div class="messagecard">
    <h1 class="name">${cur.guest}<a href=""
      ><svg
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke-width="1.5"
       stroke="red"
       class="w-6 h-6"
      >
       <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
       ></path>
      </svg>
     </a>
    </h1>
    <a href="mailto:${cur.guestemail}" class="email">${cur.guestemail}</a>
    <p class="message">${cur.message}</p>
   </div>`;
  messagesSec.insertAdjacentHTML('afterbegin', html);
 });
});
