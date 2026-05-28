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

/* Copy Email to Clipboard */
document.addEventListener('DOMContentLoaded', () => {
    const emailLink = document.querySelector('.footer-email');

    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault(); // Stop any default link behavior
            
            const emailText = 'natalie.maria.m42@gmail.com';
            
            // Modern Clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(emailText)
                    .then(() => showSuccess(this, emailText))
                    .catch(err => fallbackCopy(this, emailText));
            } else {
                // Fallback for older browsers or specific local server environments
                fallbackCopy(this, emailText);
            }
        });
    }
});

// Function to handle the "Copied!" visual feedback
function showSuccess(element, originalText) {
    element.textContent = 'Copied to clipboard!';
    element.style.color = '#00ffcc';
    element.style.textShadow = '0 0 15px rgba(0, 255, 204, 0.8)';
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.color = ''; 
        element.style.textShadow = '';
    }, 2000);
}

// Fallback copy method using a temporary textarea
function fallbackCopy(element, text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showSuccess(element, text);
    } catch (err) {
        console.error('Could not copy text: ', err);
        element.textContent = 'Failed to copy';
    }
    
    document.body.removeChild(textArea);
}