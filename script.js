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
const buttonConnect = document.querySelector('.letconnect');

const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");

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

