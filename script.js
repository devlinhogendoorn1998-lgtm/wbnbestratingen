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
        const statusMsg = document.getElementById('form-status');
        if (statusMsg) {
            statusMsg.innerText = "Bezig met verzenden...";
            statusMsg.style.color = "orange";
        }
        // Hier komt straks de emailjs.sendForm code
        // Voor nu een simpele simulatie:
        setTimeout(() => {
            if (statusMsg) {
                statusMsg.innerText = "Bedankt! Uw bericht is verzonden.";
                statusMsg.style.color = "green";
            }
            contactForm.reset(); // Maakt het formulier leeg
        }, 2000);
    });
}
