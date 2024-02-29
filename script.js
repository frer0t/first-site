const all = document.querySelectorAll('.link');
const profileSc = document.querySelector('.profile');
const buttonProfile = document.querySelector('#profile-sect1');
const aboutSc = document.querySelector('.about');
const buttonAbout = document.querySelector('.about-sect1');
const header = document.querySelector(".header");
const skillsSc = document.querySelector('.skills');
const buttonSkills = document.querySelector('.skills-sect1');
const buttonContact = document.querySelector('.contact-sect1');
const contactSc = document.querySelector('.contact');
const buttonBackTop = document.querySelector('.backtop');


buttonBackTop.addEventListener('click', function (e) {
 e.preventDefault();
 window.scrollTo({ top: 0, behavior: "smooth" });
});
buttonContact.addEventListener('click', function (e) {
 e.preventDefault();
 window.scrollTo({ top: 1580, behavior: 'smooth' });
});
buttonProfile.addEventListener('click', function (e) {
 e.preventDefault();
 window.scrollTo({ top: 0, behavior: "smooth" });
});
buttonAbout.addEventListener('click', function (e) {
 e.preventDefault();
 aboutSc.scrollIntoView({ behavior: 'smooth' });
});
buttonSkills.addEventListener('click', function (e) {
 e.preventDefault();
 window.scrollTo({ top: 1209, behavior: 'smooth' });
});
window.onload = function () {
 profileSc.style.opacity = 1;
 profileSc.style.transform = "translateY(0)";
 window.scrollTo(0, 0);
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

