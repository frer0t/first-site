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

//  Remove error on input
const removeErrorInput = function () {
  this.classList.remove('animatein');
};
inputContactEmail.onfocus = removeErrorInput;
inputContactMessage.onfocus = removeErrorInput;
inputContactname.onfocus = removeErrorInput;

/// Sending Message
btnContact.addEventListener('click', async function (e) {

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
    return false;
  }
});
contactForm.onsubmit = async function (e) {
  e.preventDefault();
  const formData = new URLSearchParams(new FormData(contactForm));
  const done = await fetch('https://energetic-pig-slacks.cyclic.app/api/message/new', {
    method: "Post", body: formData.toString(), headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  inputContactEmail.disabled = true;
  inputContactMessage.disabled = true;
  inputContactname.disabled = true;
  btnContact.disabled = true;
  const data = await done.json()
    .then(() => {
      inputContactEmail.disabled = false;
      inputContactMessage.disabled = false;
      inputContactname.disabled = false;
      btnContact.disabled = false;
      sentPopUp.style.transform = 'translateY(0)';
      sentPopUp.style.opacity = 1;
      contactForm.reset();
      setTimeout(() => {
        sentPopUp.style.transform = 'translateY(-520px)';
        sentPopUp.style.opacity = 0;
      }, 4000);
    });
};