const blogs = document.querySelector('.blogs');
const subscribe = document.querySelector('.subscribe');
const opener = document.querySelector('.opener');
const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");

opener.addEventListener('click', () => {
 subscribe.classList.toggle('close');
});

window.onload = function () {
 blogs.style.opacity = 1;
 blogs.style.transform = 'translateY(0)';
};

humburger.addEventListener("click", function () {
 bar1.classList.toggle("animatebar1");
 bar2.classList.toggle("animatebar2");
 bar3.classList.toggle("animatebar3");
 mobilenav.classList.toggle("opendrawer");
});



