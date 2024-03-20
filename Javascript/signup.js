import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';

const firebaseConfig = {
 apiKey: "AIzaSyCHHyJJfqNFz5G2r9Ohsdc__fzz8bg6Y9c",
 authDomain: "my-brand-frontend.firebaseapp.com",
 projectId: "my-brand-frontend",
 storageBucket: "my-brand-frontend.appspot.com",
 messagingSenderId: "23360536523",
 appId: "1:23360536523:web:e255e314c23f4298a9404e"
};
const signupForm = document.querySelector('.signupcard');
const btnSignup = document.querySelector('.btn-login');
const inputSignupName = document.querySelector('#name');
const inputSignupEmail = document.querySelector('#email');
const inputSignupPassword = document.querySelector('#password');
const loader = document.querySelector('.loader');
const emailRegex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,}$/;

//  REmove error on input
const removeErrorInput = function () {
 this.classList.remove('animatein');
};

inputSignupEmail.onfocus = removeErrorInput;
inputSignupName.onfocus = removeErrorInput;
inputSignupPassword.onfocus = removeErrorInput;

window.onload = function () {
 signupForm.style.opacity = 1;
 signupForm.style.transform = "translateX(0)";
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

signupForm.onsubmit = function (e) {
 e.preventDefault();
 if (signupForm.username.value !== '' && signupForm.email.value !== "" && signupForm.password.value !== '') {
  loader.style.display = 'flex';
  addDoc(userColRef, {
   email: signupForm.email.value,
   password: signupForm.password.value,
   username: signupForm.username.value,
  }).then(() => {
   inputSignupEmail.blur();
   inputSignupName.blur();
   inputSignupPassword.blur();
   signupForm.reset();
   alert('Account Successfully Created');
   loader.style.display = 'none';
   setTimeout(() => {
    window.open('/html/login.html', '_top');
   }, 1000);;
  });
 }
};


btnSignup.addEventListener('click', function (e) {
 if (inputSignupEmail.value === '' || !emailRegex.test(inputSignupEmail.value)) {
  inputSignupEmail.classList.add('animatein');
  e.preventDefault();
 }
 if (inputSignupName.value === '') {
  inputSignupName.classList.add('animatein');
  e.preventDefault();
 }

 if (inputSignupPassword.value === '' || inputSignupPassword.value.length < 8) {
  inputSignupPassword.classList.add('animatein');
  e.preventDefault();
 }
});