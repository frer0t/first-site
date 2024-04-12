const signupForm = document.querySelector('.signupcard');
const btnSignup = document.querySelector('.btn-login');
const inputSignupName = document.querySelector('#name');
const inputSignupEmail = document.querySelector('#email');
const inputSignupPassword = document.querySelector('#password');
const loader = document.querySelector('.loader');
const emailRegex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,}$/;
const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");


//  Remove error on input
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

humburger.addEventListener("click", function () {
 bar1.classList.toggle("animatebar1");
 bar2.classList.toggle("animatebar2");
 bar3.classList.toggle("animatebar3");
 mobilenav.classList.toggle("opendrawer");
});

signupForm.addEventListener("submit", async function (e) {
 e.preventDefault();
 if (inputSignupName.value === '') {
  inputSignupName.classList.add('animatein');
  e.preventDefault();
  return false;
 }
 if (inputSignupEmail.value === '' || !emailRegex.test(inputSignupEmail.value)) {
  inputSignupEmail.classList.add('animatein');
  e.preventDefault();
  return false;
 }

 if (inputSignupPassword.value === '' || inputSignupPassword.value.length < 8) {
  inputSignupPassword.classList.add('animatein');
  e.preventDefault();
  return;
 }
 loader.style.display = "flex";
 const user = await fetch('http://localhost:2000/api/user', {
  method: "post", headers: {
   "Content-type": "application/json"
  }, body: JSON.stringify({
   username: inputSignupName.value,
   password: inputSignupPassword.value,
   email: inputSignupEmail.value
  })
 });
 const json = await user.json();
 if (user.status === 409) {
  alert(json.message);
  inputSignupName.classList.add('animatein');
  inputSignupName.value = '';
  inputSignupEmail.classList.add('animatein');
  inputSignupEmail.value = '';
  return false;
 }
 if (user.status === 201) {
  alert(json.message);
  window.location.href = json.open;
  return true;
 }
 if (user.status !== 201 || user.status !== 409) {
  alert(json.messages);
  window.location.reload();
 }

});