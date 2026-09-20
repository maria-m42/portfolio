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
            e.preventDefault(); 
            
            const emailText = 'nm.moore.dev@gmail.com';
            
            // Modern Clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(emailText)
                    .then(() => showSuccess(this, emailText))
                    .catch(err => fallbackCopy(this, emailText));
            } else {
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
    textArea.style.position = 'fixed'; 
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

/* ==========================================================================
   MODAL CONTROLS (Open / Close HTML Dialog)
   ========================================================================== */

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.showModal();
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.close();
        document.body.style.overflow = 'auto'; 
    }
}

document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox && lightbox.classList.contains('active')) return;

    if (e.target.tagName === 'DIALOG') {
        e.target.close();
        document.body.style.overflow = 'auto';
    }
});


/* ==========================================================================
   MULTI-IMAGE LIGHTBOX GALLERY (arrows + counter)
   ========================================================================== */
let currentGroup = [];
let currentIndex = 0;

function openLightboxGroup(imageArray, startIndex, captionText) {
    if (!imageArray || imageArray.length === 0) return;

    currentGroup = imageArray;
    currentIndex = startIndex;
    
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');

    // Update image and caption
    lightboxImg.src = currentGroup[currentIndex];
    lightboxCaption.textContent = captionText || '';
    
    // === NEW: Initialize Counter ===
    updateLightboxCounter(lightboxCounter);
    
    lightbox.classList.add('active');
}

function changeLightboxImg(direction, event) {
    if (event) event.stopPropagation(); 
    if (currentGroup.length <= 1) return; 

    currentIndex = (currentIndex + direction + currentGroup.length) % currentGroup.length;
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    // Update image
    lightboxImg.src = currentGroup[currentIndex];
    
    // === NEW: Update Counter ===
    updateLightboxCounter(lightboxCounter);
}

function updateLightboxCounter(counterElement) {
    if (counterElement && currentGroup.length > 1) {
        counterElement.textContent = `${currentIndex + 1} / ${currentGroup.length}`;
        counterElement.style.display = 'block'; 
    } else if (counterElement) {
        counterElement.style.display = 'none'; 
    }
}

function closeLightbox(event) {
    if (event.target.id === 'image-lightbox' || event.target.classList.contains('lightbox-close')) {
        const lightbox = document.getElementById('image-lightbox');
        lightbox.classList.remove('active');
        
        currentGroup = [];
        currentIndex = 0;
    }
}