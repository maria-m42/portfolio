function toggleMenu() {
    const navList = document.getElementById('nav-list');
    navList.classList.toggle('active');
}
// Optional: Closes the menu when a link is clicked
document.querySelectorAll('.nav-items a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-list').classList.remove('active');
    });
});
