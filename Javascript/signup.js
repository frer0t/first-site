const signupForm = document.querySelector('.signupcard');
const btnSignup = document.querySelector('.btn-login');
const inputSignupName = document.querySelector('#name');
const inputSignupEmail = document.querySelector('#email');
const inputSignupPassword = document.querySelector('#password');
const emailRegex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,}$/;

//  REmove error on input
const removeErrorInput = function () {
 this.classList.remove('animatein');
};

inputSignupEmail.onfocus = removeErrorInput;
inputSignupName.onfocus = removeErrorInput;
inputSignupPassword.onfocus = removeErrorInput;

signupForm.onsubmit = function (e) {
 alert('Account Successfully Created ');
 inputSignupEmail.value = '';
 inputSignupName.value = '';
 inputSignupPassword.value = '';
};


btnSignup.addEventListener('click', function (e) {
 if (inputSignupEmail.value === '' || !emailRegex.test(inputSignupEmail.value)) {
  e.preventDefault();
  inputSignupEmail.classList.add('animatein');
 }
 if (inputSignupName.value === '') {
  e.preventDefault();
  inputSignupName.classList.add('animatein');
 }

 if (inputSignupPassword.value === '' || inputSignupPassword.value.length < 8) {
  e.preventDefault();
  inputSignupPassword.classList.add('animatein');
 }
});

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