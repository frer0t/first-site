const loginForm = document.querySelector(".logincard");
const btnLogin = document.querySelector('.btn-login');
const inputUsername = document.querySelector('#username');
const inputPassword = document.querySelector('#password');
const user1 = {
 username: 'frerot',
 password: 'iamfrerot',
};

// Remove error animation
const removeErrorInput = function () {
 this.classList.remove('animatein');
};
inputUsername.onfocus = removeErrorInput;
inputPassword.onfocus = removeErrorInput;

loginForm.onsubmit = function () {
 inputPassword.value = '';
 inputUsername.value = '';
};
btnLogin.addEventListener('click', function (e) {
 if (user1.username !== inputUsername.value) {
  e.preventDefault();
  inputUsername.classList.add('animatein');
  inputUsername.value = '';
 }
 if (user1.password !== inputPassword.value) {
  e.preventDefault();
  inputPassword.classList.add('animatein');
  inputPassword.value = '';
 }
});

window.onload = function () {
 loginForm.style.opacity = 1;
 loginForm.style.transform = "translateX(0)";

};
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

