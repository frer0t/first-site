const loginForm = document.querySelector(".logincard");
const btnLogin = document.querySelector('.btn-login');
const inputUsername = document.querySelector('#username');
const inputPassword = document.querySelector('#password');
const loader = document.querySelector('.loader');
const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");

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
;

humburger.addEventListener("click", function () {
 bar1.classList.toggle("animatebar1");
 bar2.classList.toggle("animatebar2");
 bar3.classList.toggle("animatebar3");
 mobilenav.classList.toggle("opendrawer");
});

loginForm.addEventListener('submit', async (e) => {
 e.preventDefault();
 if (inputUsername.value === '') {
  inputUsername.classList.add('animatein');
  return false;
 }
 if (inputPassword.value === '' || inputPassword.value.length < 8) {
  inputPassword.classList.add('animatein');
  return false;
 }
 try {
  const user = {
   username: inputUsername.value,
   password: inputPassword.value
  };
  const login = await fetch("http://localhost:2000/html/dashboard", {
   method: "post", method: "post", headers: {
    "Content-type": "application/json"
   },
   body: JSON.stringify(user)
  });
  const data = await login.json();

  if (login.status === 401) {
   loginForm.reset();
   inputPassword.blur();
   inputUsername.blur();
   inputUsername.classList.add('animatein');
   inputUsername.value = "";
   inputPassword.classList.add('animatein');
   inputPassword.value = "";
   alert(data.message);
   return false;
  }
  localStorage.setItem('token', data.token);
  alert(data.message);
  window.location.href = data.open;
 } catch (error) {
  console.error("Error Login", error);
 }
});
