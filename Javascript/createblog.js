
const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");
const getImage1 = document.querySelector('.getimage1');
const getImage2 = document.querySelector('.getimage2');
const inputImage1 = document.querySelector('#image1');
const inputImage2 = document.querySelector('#image2');
const labelImage1 = document.querySelector('.labelimg1');
const labelImage2 = document.querySelector('.labelimg2');
const form = document.querySelector('.form');
const titleForm = document.querySelector('#title');
const bodyForm = document.querySelector('#body');
const postBtn = document.querySelector('.post');
let arrayBlogs = [];

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

const removeErrorInput = function () {
 this.classList.remove('animatein');
};

inputImage1.addEventListener('change', function (e) {
 getImage1.style.display = 'block';
 getImage1.src = URL.createObjectURL(e.target.files[0]);
});
inputImage2.addEventListener('change', function (e) {
 if (e?.target?.files && e?.target?.files[0]) {
  getImage2.style.display = 'block';
  getImage2.src = URL.createObjectURL(e.target.files[0]);
 }
});


titleForm.onfocus = removeErrorInput;
bodyForm.onfocus = removeErrorInput;
labelImage1.onclick = removeErrorInput;
labelImage2.onclick = removeErrorInput;

postBtn.addEventListener('click', function (e) {
 if (titleForm.value === "") {
  e.preventDefault();
  titleForm.classList.add('animatein');
 }
 if (bodyForm.value === '') {
  e.preventDefault();
  bodyForm.classList.add('animatein');
 }
 if (getImage1.src === '') {
  labelImage1.classList.add('animatein');
 }
 if (getImage2.src === '') {
  labelImage2.classList.add('animatein');
 }
});


const submit = function () {
 const today = new Date();
 const date = today.getDate();
 const month = String(today.getMonth()).padStart(2, '0');
 const year = today.getFullYear();
 blog = {
  image1: getImage1.src,
  image2: getImage2.src,
  title: titleForm.value,
  body: bodyForm.value,
  thedate: `${date} ${month} ${year}`,
  likes: 0,
  comments: 0,
 };
 if (localStorage.getItem('blogs')) {
  arrayBlogs = JSON.parse(localStorage.getItem('blogs'));
  arrayBlogs.unshift(blog);
  localStorage.setItem('blogs', JSON.stringify(arrayBlogs));
 }
 if (!localStorage.getItem('blogs')) {
  arrayBlogs.unshift(blog);
  localStorage.setItem('blogs', JSON.stringify(arrayBlogs));
 }

 alert('Posted');
};


form.onsubmit = submit;
