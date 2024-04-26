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
const formCreate = document.querySelector('.form');
const titleBlog = document.querySelector('#title');
const subTitleBlog = document.querySelector('#sub-title');
const bodyBlog = document.querySelector('#body');
const postBtn = document.querySelector('.post');
const loader = document.querySelector('.loader');
const body = document.querySelector('body');
humburger.addEventListener("click", function () {
 bar1.classList.toggle("animatebar1");
 bar2.classList.toggle("animatebar2");
 bar3.classList.toggle("animatebar3");
 mobilenav.classList.toggle("opendrawer");
});
window.onload = function () {
 formCreate.style.opacity = 1;
 formCreate.style.transform = 'translateX(0)';
};
const removeErrorInput = function () {
 this.classList.remove('animatein');
};
(async function (e) {
 const response = await fetch(`https://energetic-pig-slacks.cyclic.app/admin/blog/${JSON.parse(localStorage.getItem('blogEdit'))}`, {
  'headers': {
   'authorization': `Bearer ${localStorage.getItem('token')}`
  }
 });
 const data = await response.json();
 getImage1.style.display = 'block';
 getImage2.style.display = 'block';
 const blog = data;
 getImage1.src = blog.img1;
 getImage2.src = blog.img2;
 titleBlog.value = blog.title;
 subTitleBlog.value = blog.subtitle;
 bodyBlog.value = blog.body;
})();
inputImage1.addEventListener('change', function (e) {
 getImage1.style.display = 'block ';
 getImage1.src = URL.createObjectURL(e.target.files[0]);
});

inputImage2.addEventListener('change', function (e) {
 if (e?.target?.files && e?.target?.files[0]) {
  getImage2.style.display = 'block';
  getImage2.src = URL.createObjectURL(e.target.files[0]);
 }
});
titleBlog.onfocus = removeErrorInput;
bodyBlog.onfocus = removeErrorInput;
labelImage1.onclick = removeErrorInput;
labelImage2.onclick = removeErrorInput;
subTitleBlog.onfocus = removeErrorInput;

postBtn.addEventListener('click', function (e) {
 if (titleBlog.value === "") {
  e.preventDefault();
  titleBlog.classList.add('animatein');
 }
 if (bodyBlog.value === '') {
  e.preventDefault();
  bodyBlog.classList.add('animatein');
 }
 if (subTitleBlog.value === '') {
  e.preventDefault();
  subTitleBlog.classList.add('animatein');

 }
 if (getImage1.src === '') {
  e.preventDefault();
  labelImage1.classList.add('animatein');
 }
 if (getImage2.src === '') {
  e.preventDefault();
  labelImage2.classList.add('animatein');
 }
});

const updateBlog = async function (e) {
 e.preventDefault();
 if (subTitleBlog.value !== '' && titleBlog.value !== "" && bodyBlog.value !== '' && getImage1.src !== '' && getImage2.src !== '') {
  if (confirm('Are Sure You want to Update the Blog')) {
   postBtn.disable;
   loader.style.display = 'flex';
   body.style.overflow = 'hidden';
   try {
    const formData = new FormData(formCreate);
    const response = await fetch(`https://energetic-pig-slacks.cyclic.app/admin/blog/update/${JSON.parse(localStorage.getItem('blogEdit'))}`, {
     method: "PUT",
     body: formData, 'headers': {
      'authorization': `Bearer ${localStorage.getItem('token')}`
     }
    });
    const json = await response.json();
    alert(json.message);
    window.location.href = "dashboard.html";
   } catch (error) {
    console.log(error);
   }
  }
 }
};

formCreate.addEventListener('submit', updateBlog);
