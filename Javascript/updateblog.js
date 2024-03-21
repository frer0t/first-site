import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getFirestore, collection, serverTimestamp, getDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js';
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

const firebaseConfig = {
 apiKey: "AIzaSyCHHyJJfqNFz5G2r9Ohsdc__fzz8bg6Y9c",
 authDomain: "my-brand-frontend.firebaseapp.com",
 projectId: "my-brand-frontend",
 storageBucket: "my-brand-frontend.appspot.com",
 messagingSenderId: "23360536523",
 appId: "1:23360536523:web:e255e314c23f4298a9404e"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const blogRef = doc(db, 'blogs', JSON.parse(localStorage.getItem('blogEdit')));
const storage = getStorage(app);

getDoc(blogRef).then((data) => {
 getImage1.style.display = 'block';
 getImage2.style.display = 'block';
 const blog = data.data();
 getImage1.src = blog.image1;
 getImage2.src = blog.image2;
 titleBlog.value = blog.title;
 subTitleBlog.value = blog.subtitle;
 bodyBlog.value = blog.body;
});

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
   const file1 = inputImage1.files[0];
   const file2 = inputImage2.files[0];
   let image1;
   let image2;
   try {
    if (file1) {
     const blogImg1 = ref(storage, 'blogsImg/' + file1.name);
     await uploadBytes(blogImg1, file1);
     image1 = await getDownloadURL(blogImg1);
    } else {
     image1 = getImage1.src;
    }
    if (file2) {
     const blogImg2 = ref(storage, 'blogsImg/' + file2.name);
     await uploadBytes(blogImg2, file2);
     image2 = await getDownloadURL(blogImg2);
    } else {
     image2 = getImage2.src;
    }
    const data = {
     title: titleBlog.value,
     body: bodyBlog.value,
     subtitle: subTitleBlog.value,
     image1: image1,
     image2: image2,
     thedate: serverTimestamp(),
    };
    await updateDoc(blogRef, data).then(() => {
     formCreate.reset();
     loader.style.disable = 'none';
     localStorage.clear();
     alert('Update Successful');
     window.open('./adminblog.html', '_self');
    });

   } catch {
    console.log(err => console.log("error:", err));
   }
  }
 }
};

formCreate.addEventListener('submit', updateBlog);
