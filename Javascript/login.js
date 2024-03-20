import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
const loginForm = document.querySelector(".logincard");
const btnLogin = document.querySelector('.btn-login');
const inputUsername = document.querySelector('#username');
const inputPassword = document.querySelector('#password');
const loader = document.querySelector('.loader');

const firebaseConfig = {
 apiKey: "AIzaSyCHHyJJfqNFz5G2r9Ohsdc__fzz8bg6Y9c",
 authDomain: "my-brand-frontend.firebaseapp.com",
 projectId: "my-brand-frontend",
 storageBucket: "my-brand-frontend.appspot.com",
 messagingSenderId: "23360536523",
 appId: "1:23360536523:web:e255e314c23f4298a9404e"
};

// Remove error animation
const removeErrorInput = function () {
 this.classList.remove('animatein');
};
inputUsername.onfocus = removeErrorInput;
inputPassword.onfocus = removeErrorInput;

window.onload = function () {
 loginForm.style.opacity = 1;
 loginForm.style.transform = "translateX(0)";

};
const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");

humburger.addEventListener("click", function () {
 bar1.classList.toggle("animatebar1");
 bar2.classList.toggle("animatebar2");
 bar3.classList.toggle("animatebar3");
 mobilenav.classList.toggle("opendrawer");
});


initializeApp(firebaseConfig);
const db = getFirestore();
const userColRef = collection(db, 'users');



loginForm.onsubmit = function (e) {
 e.preventDefault();
 onSnapshot(userColRef, (snapshot => {
  let users = [];
  snapshot;
  snapshot.docs.forEach(doc => {
   users.push({ ...doc.data(), id: doc.id });
  });
  users.forEach((user, i, arr) => {

   if (i === arr.length - 1 && inputPassword.value.trim() !== user.password || inputUsername.value.trim() !== user.username) {
    inputPassword.classList.add('animatein');
    inputUsername.classList.add('animatein');
    inputUsername.value = '';
    inputPassword.value = "";
   }
   if (user.username === inputUsername.value.trim() && user.password === inputPassword.value.trim()) {
    inputPassword.blur();
    inputUsername.blur();
    loginForm.reset();
    loader.style.display = 'flex';
    loginForm.reset();
    setTimeout(() => {
     window.open('/html/dashboard.html', '_top');
    }, 1000);
   }
  });
 }));

};
