const buttonBackTop = document.querySelector('.backtop');
const blogs = document.querySelector('.blogs');

window.onload = function () {
 blogs.style.opacity = 1;
 blogs.style.transform = 'translateY(0)';
};
buttonBackTop.addEventListener('click', function (e) {
 e.preventDefault();
 blogs.scrollTo({ top: 0, behavior: 'smooth' });

 window.scrollTo({ top: 0, behavior: 'smooth' });
});