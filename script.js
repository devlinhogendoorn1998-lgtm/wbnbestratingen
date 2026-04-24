// Hamburger menu werkend maken
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            menuBtn.classList.toggle('open');
        });
    }

    // Optioneel: menu sluiten bij klik op link (voor mobiel)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            menuBtn.classList.remove('open');
        });
    });
});
// // Section: WhatsApp Click Tracker (Optional)
document.querySelector('.whatsapp-float').addEventListener('click', function() {
    console.log('Gebruiker heeft op de WhatsApp knop geklikt.');
    // Hier kun je eventueel analytics triggers toevoegen
});
// Section: // Gallery Open Functie
function openGallery(folderName) {
    // Deze functie blijft hetzelfde als we eerder hebben besproken
    currentFolder = folderName;
    currentPhotoIndex = 1;
    document.getElementById('galleryModal').style.display = "block";
    updateGallery();
}

// Section: // EmailJS Voorbereiding
// Let op: Je moet de EmailJS SDK in je HTML header laden voor dit werkt
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const btn = document.querySelector('.btn-send');
        const statusMsg = document.getElementById('form-status');

        if (btn) {
            btn.innerText = 'Bezig met verzenden...';
            btn.disabled = true;
        }
        if (statusMsg) {
            statusMsg.innerText = '';
            statusMsg.style.color = '';
        }

        // Jouw specifieke ID's zijn hier ingevuld
        const serviceID = 'service_zl8zyo5';
        const templateID = 'template_fb6o107';

        emailjs.sendForm(serviceID, templateID, this)
            .then(function() {
                if (statusMsg) {
                    statusMsg.innerText = "Bedankt! Uw bericht is verzonden.";
                    statusMsg.style.color = "#3be436";
                }
                if (btn) {
                    btn.innerText = 'Bericht verzonden';
                    btn.disabled = false;
                }
                contactForm.reset();
            }, function(error) {
                if (statusMsg) {
                    statusMsg.innerText = "Fout: " + (error.text || JSON.stringify(error));
                    statusMsg.style.color = "red";
                }
                if (btn) {
                    btn.innerText = 'Opnieuw proberen';
                    btn.disabled = false;
                }
            });
    });
}
