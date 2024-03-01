const buttonBackTop = document.querySelector('.backtop');
const Projects = document.querySelector('.projectsCards');
buttonBackTop.addEventListener('click', function (e) {
 e.preventDefault();
 window.scrollTo({ top: 0, behavior: 'smooth' });
});


window.onload = function () {
 Projects.style.transform = "translateY(0)";
 Projects.style.opacity = 1;
 window.scrollTo(0, 0);
}

