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
const emailRegex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,}$/;
const all = document.querySelectorAll('.link');
const profileSc = document.querySelector('.profile');
const buttonProfile = document.querySelector('#profile-sect1');
const aboutSc = document.querySelector('.about');
const buttonAbout = document.querySelector('.about-sect1');
const skillsSc = document.querySelector('.skills');
const buttonSkills = document.querySelector('.skills-sect1');
const buttonContact = document.querySelector('.contact-sect1');
const contactSc = document.querySelector('.contact');
const buttonConnect = document.querySelector('.letconnect');
const contactForm = document.querySelector('.contact-form');
const inputContactname = document.getElementById('guest');
const inputContactEmail = document.getElementById('guestemail');
const inputContactMessage = document.getElementById('message');
const btnContact = document.getElementById('btn-contact');
const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");
const sentPopUp = document.querySelector('.sent ');

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


buttonConnect.addEventListener('click', function (e) {
 e.preventDefault();
 contactSc.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
});
buttonContact.addEventListener('click', function (e) {
 e.preventDefault();
 contactSc.scrollIntoView({ block: "nearest", behavior: 'smooth' });
});
buttonProfile.addEventListener('click', function (e) {
 e.preventDefault();
 window.scrollTo({ top: 0, behavior: "smooth" });
});
buttonAbout.addEventListener('click', function (e) {
 e.preventDefault();
 aboutSc.scrollIntoView({ block: 'center', behavior: 'smooth' });
});
buttonSkills.addEventListener('click', function (e) {
 e.preventDefault();
 skillsSc.scrollIntoView({ block: 'center', behavior: 'smooth' });
});
window.onload = function () {
 profileSc.style.opacity = 1;
 profileSc.style.transform = "translateY(0)";
};
all.forEach(function (a) {
 a.addEventListener('click', function (e) {
  if (!a.classList.contains('clicked')) {
   all.forEach(a => {
    a.classList.remove('clicked');
   });
   a.classList.add('clicked');
  }
 });
});

//  REmove error on input
const removeErrorInput = function () {
 this.classList.remove('animatein');
};
inputContactEmail.onfocus = removeErrorInput;
inputContactMessage.onfocus = removeErrorInput;
inputContactname.onfocus = removeErrorInput;
initializeApp(firebaseConfig);
const db = getFirestore();
const messagesColRef = collection(db, 'messages');


contactForm.onsubmit = function (e) {
 e.preventDefault();
 addDoc(messagesColRef, {
  guest: contactForm.guest.value,
  guestemail: contactForm.guestemail.value,
  message: contactForm.message.value,
 })
  .then(() => {
   sentPopUp.style.transform = 'translateY(0)';
   sentPopUp.style.opacity = 1;
   contactForm.reset();
   setTimeout(() => {
    sentPopUp.style.transform = 'translateY(-520px)';
    sentPopUp.style.opacity = 0;
   }, 4000);
  });
};
btnContact.addEventListener('click', function (e) {
 if (!inputContactname.value) {
  inputContactname.classList.add('animatein');
  e.preventDefault();
 };
 if (inputContactEmail.value === '' || !emailRegex.test(inputContactEmail.value)) {
  inputContactEmail.classList.add('animatein');
  e.preventDefault();
 }
 if (inputContactMessage.value === '') {
  inputContactMessage.classList.add('animatein');
  e.preventDefault();
 }
});