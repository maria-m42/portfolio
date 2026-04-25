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
// Background 
const bg = document.querySelector('.portfolio-bg');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    // 1. Update the background "Flashlight"
    bg.style.backgroundImage = `
        radial-gradient(at ${x}% ${y}%, rgba(0, 255, 204, 0.3) 0px, transparent 50%),
        radial-gradient(at 0% 0%, rgba(0, 255, 204, 0.18) 0px, transparent 55%),
        radial-gradient(at 100% 0%, rgba(122, 0, 255, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(0, 255, 204, 0.12) 0px, transparent 50%),
        radial-gradient(at 0% 100%, rgba(122, 0, 255, 0.15) 0px, transparent 50%)
    `;

    // 2. Accessibility: Brighten the text when the mouse is near
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        const rect = profileContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance between mouse and the center of the text
        const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        // If the mouse is within 400px, make the text pop more
        if (distance < 400) {
            const intensity = 1 + (1 - distance / 400) * 0.15; // Up to 30% brighter
            profileContainer.style.filter = `brightness(${intensity})`;
        } else {
            profileContainer.style.filter = `brightness(1)`;
        }
    }
});