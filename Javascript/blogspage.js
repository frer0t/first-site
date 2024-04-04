const blogs = document.querySelector('.blogs');
const subscribe = document.querySelector('.subscribe');
const subscriber = document.querySelector('.emailsub');
const subscribeBtn = document.getElementById('newSub');
const opener = document.querySelector('.opener');
const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");
const noBlogs = document.querySelector('.sorry');
const emailRegex = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,}$/;
const removeErrorInput = function () {
  this.classList.remove('animatein');
};
/// Getting blogs
(async () => {
  let blogsData;
  try {
    const response = await fetch('http://localhost:2000/api/blogs');
    const data = await response.json();
    blogsData = [...data];
  } catch (error) {
    console.log(error);
  }
  if (blogsData) {
    noBlogs.style.display = 'none';
    blogs.style.marginTop = '100px';
    blogs.style.marginBottom = '70px';
  }
  blogsData.forEach(blog => {
    const dateString = new Date(blog.createdAt);
    const options = {
      weekday: 'long', // Options for toLocaleDateString()
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    };
    const outputDate = dateString.toLocaleDateString('en-us', options);
    const html = `<div class="blogcard">
  <a href="blog.html" data-id="${blog._id}">
   <img src="${blog.img1}" class="image" alt="" />
  <div class="alldes">
   <p class="date">${outputDate}</p>
   <h3 class="topic">
   ${blog.title}
   </h3>
   <p class="blog-text">${blog.subtitle}</p>
   <div class="reactions">
    <div class="like">
     <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
     >
      <rect width="100%" height="100%" fill="none" />
      <path
       stroke="black"
       stroke-width="1"
       d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
     </svg>
     <p class="likes">${blog.likes}</p>
    </div>
    <div class="comment">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
       d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
      />
     </svg>
     <p class="comments">${blog.comment}</p>
    </div>
   </div>
   </a>
  </div>`;
    blogs.insertAdjacentHTML('beforeend', html);
  }
  );
})();
subscriber.onfocus = removeErrorInput;
subscribe.addEventListener('submit', async function (e) {
  e.preventDefault();
  if (subscriber.value === '' || !emailRegex.test(subscriber.value)) {
    subscriber.classList.add('animatein');
  } else {
    subscriber.disabled = true;
    subscribeBtn.disabled = true;
    await fetch('http://localhost:2000/api/sub', {
      method: "post", headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ subscriber: subscriber.value })
    })
      .then(() => {
        subscriber.disabled = false;
        subscribeBtn.disabled = false;
        subscriber.value = "";
        alert("Subscribed Successfully Check Your Inbox");
      });
  }
});

// Close Subs input
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

blogs.addEventListener('click', function (event) {
  const blogPage = event.target;
  if (blogPage.dataset.id) {
    localStorage.setItem('singleblog', JSON.stringify(blogPage.dataset.id));
  }
});