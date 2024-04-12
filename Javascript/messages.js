const humburger = document.querySelector(".humburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobilenav = document.querySelector(".mobilenav");
const messagesSec = document.querySelector('.messages');
const noMessages = document.querySelector('.noMessages');
const signOut = document.querySelector('.btn-signout');
window.onload = function () {
  messagesSec.style.opacity = 1;
  messagesSec.style.transform = 'translateY(0)';
};
signOut.addEventListener('click', function () {
  localStorage.clear();
  window.location.reload();
});
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


(async () => {
  const response = await fetch('http://localhost:2000/admin/messages');
  const messages = await response.json();
  if (messages.length > 0) {
    noMessages.style.display = 'none';
    messages.forEach(message => {
      const html = `<div  class="messagecard">
    <h1  class="name">${message.guest}
    <a  data-id='${message._id}'><svg
      class='delete'
      data-id='${message._id}'
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke-width="1.5"
       stroke="red"
       class="w-6 h-6"
      >
       <path
       data-id='${message._id}'
       class='delete'
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
       ></path>
      </svg>
     </a>
    </h1>
    <a href="mailto:${message.guestemail}" class="email">${message.guestemail}</a>
    <p class="message">${message.message}</p>
   </div>`;
      messagesSec.insertAdjacentHTML('afterbegin', html);
    });
  }
})();

messagesSec.addEventListener('click', async function (e) {
  e.preventDefault();
  if (e.target.classList.contains('delete')) {
    const deletBtn = e.target;
    const deleteId = deletBtn.dataset.id;
    if (confirm('Are You Want Delete this Message')) {
      await fetch(`http://localhost:2000/admin/delete/message/${deleteId}`, { method: "Delete" });
      alert("Succefully Deleted Message");
      window.location.reload();
    }
  }
});