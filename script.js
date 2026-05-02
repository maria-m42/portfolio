function toggleMenu() {
    const navList = document.getElementById('nav-list');
    navList.classList.toggle('active');
}

document.querySelectorAll('.nav-items a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-list').classList.remove('active');
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = document.getElementById('submit-button');
    btn.innerText = 'SENDING...';

    const serviceID = 'service_t3hlvru';
    const templateID = 'template_8f9i74u';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.innerText = 'MESSAGE SENT!';
            
            btn.classList.add('sent-success'); 
            
            btn.disabled = true; 
            /* ----------------------- */
            document.getElementById('contact-form').reset();
            
        }, (err) => {
            btn.innerText = 'FAILED...';
            console.log(JSON.stringify(err));
        });
});
