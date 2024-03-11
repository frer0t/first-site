const getImage1 = document.querySelector('.getimage1');
const getImage2 = document.querySelector('.getimage2');
const inputImage1 = document.querySelector('#image1');
const inputImage2 = document.querySelector('#image2');
const form = document.querySelector('.form');



inputImage1.addEventListener('change', function (e) {
 if (e?.target?.files && e?.target?.files[0]) {
  getImage1.style.display = 'block';
  getImage1.src = URL.createObjectURL(e.target.files[0]);
 }
});
inputImage2.addEventListener('change', function (e) {
 if (e?.target?.files && e?.target?.files[0]) {
  getImage2.style.display = 'block';
  getImage2.src = URL.createObjectURL(e.target.files[0]);
 }
});

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

window.onload = function () {
 form.style.opacity = 1;
 form.style.transform = 'translateX(0)';
};