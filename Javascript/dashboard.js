const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");
const dashboard = document.querySelector('.dashboard');
const articles = document.querySelector('.articles');
const queries = document.querySelector('.queries');
const subsSec = document.querySelector('.subs');
const signOut = document.querySelectorAll('.btn-signout');
window.onload = function () {
    dashboard.style.opacity = 1;
    dashboard.style.transform = 'translateY(0)';
};

signOut.forEach(button => {
    button.addEventListener('click', function (event) {
        localStorage.clear();
        window.location.reload();
    });
});



humburger.addEventListener("click", function () {
    bar1.classList.toggle("animatebar1");
    bar2.classList.toggle("animatebar2");
    bar3.classList.toggle("animatebar3");
    mobilenav.classList.toggle("opendrawer");
});
// Adding recent Blogs
(async function (e) {
    const response = await fetch('http://localhost:2000/admin/blogsre', {
        'headers': {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const blogs = await response.json();
    blogs.forEach(blog => {
        const date = new Date(blog.createdAt).toDateString();
        const html = `<article>
       <p class="time-date">${date}</p>
       <div class="art">
        <img src="${blog.img2}" />
        <p>${blog.title}</p>
       </div>
       <div class="actions">
        <a class="edit" data-id="${blog._id}" ><svg
        class="edit"
        data-id="${blog._id}"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="fill: rgba(0, 0, 0, 1)"
         >
          <path
          data-id="${blog._id}"
          class="edit"
           d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"
          ></path>
          <path
           d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"
          ></path>
         </svg>
        </a>
        <a class="delete" data-id="${blog._id}"
         ><svg
         class="delete"
         data-id="${blog._id}"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="red"
          class="w-6 h-6"
         >
          <path
          class="delete"
          data-id="${blog._id}"
           stroke-linecap="round"
           stroke-linejoin="round"
           d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
         </svg>
        </a>
       </div>
      </article>`;
        articles.insertAdjacentHTML('beforeend', html);
    });
})();

// Adding recent Queries

(async function (e) {
    const response = await fetch("http://localhost:2000/admin/messagesre", {
        'headers': {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const messages = await response.json();
    messages.forEach(message => {
        const html2 = `<div class="querie">
      <div class="sender-dt">
       <p class="sender-name">${message.guest}</p>
       <a href="mailto:${message.guestemail}" class="sender-mail">${message.guestemail}</a>
      </div>
      <p class="message">${message.message}</p>
     </div>`;
        queries.insertAdjacentHTML('beforeend', html2);
    });
})();

// Adding SubsList

(async function (e) {
    const response = await fetch('http://localhost:2000/admin/subs', {
        'headers': {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const subs = await response.json();
    subs.forEach(sub => {
        const html3 = `<p class="sub">${sub.subscriber}
       <a href='' data-id='${sub._id}' class="remove"
        ><svg
        data-id='${sub._id}' class="remove"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke-width="1.5"
         stroke="red"
         class="w-6 h-6"
        >
         <path
         data-id='${sub._id}' class="remove"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
         />
        </svg>
       </a>
      </p>`;
        subsSec.insertAdjacentHTML('afterbegin', html3);
    });
})();
// Deleting Blog

articles.addEventListener('click', async function (event) {
    if (event.target.classList.contains('delete')) {
        if (confirm('Are you Sure you i want to delete The Blog')) {
            const deleteButton = event.target;
            const deleteId = deleteButton.dataset.id;
            const deleteBlog = await fetch(`http://localhost:2000/admin/blog/delete/${deleteId}`, {
                method: "delete", 'headers': {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const json = await deleteBlog.json();
            alert(json.message);
        }
    }
});

// Editing blog

articles.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit')) {
        const editButton = event.target;
        const editId = editButton.dataset.id;
        localStorage.setItem('blogEdit', JSON.stringify(editId));
        window.location.href = "updateblog.html";
    }
});