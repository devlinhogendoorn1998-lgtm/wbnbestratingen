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
// Section: // Cookie Logica (30 dagen onthouden)
document.addEventListener("DOMContentLoaded", function() {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("cookie-accept");
    const declineBtn = document.getElementById("cookie-decline");

    // Controleer of de cookie "cookie_consent" al bestaat
    if (!getCookie("cookie_consent")) {
        banner.style.display = "block";
    }

    // Actie bij Toestaan
    acceptBtn.onclick = function() {
        setCookie("cookie_consent", "accepted", 30); // 30 dagen opslaan
        banner.style.display = "none";
    };

    // Actie bij Weigeren
    declineBtn.onclick = function() {
        banner.style.display = "none"; // Alleen verbergen voor nu
    };
});

// Functie om een cookie te maken
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Functie om een cookie uit te lezen
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
// Section: // Logica voor het laden van projectmappen
let currentSlideIndex = 0;
let currentProjectImages = [];
let touchStartX = 0;
let touchEndX = 0;

function openProject(projectId) {
    currentProjectImages = [];
    for (let i = 1; i <= 10; i++) {
        currentProjectImages.push(`images/${projectId}/${i}.jpeg`);
    }
    currentSlideIndex = 0;
    document.getElementById('projectModal').style.display = "block";
    updateSlider();
}

function closeModal() {
    document.getElementById('projectModal').style.display = "none";
}

function updateSlider() {
    const container = document.getElementById('slider-container');
    // Fade out
    container.style.opacity = 0;
    setTimeout(() => {
        container.innerHTML = `<img src="${currentProjectImages[currentSlideIndex]}" draggable="false">`;
        // Fade in
        container.style.opacity = 1;
    }, 200);
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= currentProjectImages.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = currentProjectImages.length - 1;
    updateSlider();
}

// Swipe detectie voor mobiel
const slider = document.getElementById('projectModal');

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) changeSlide(1); // Swipe links -> volgende
    if (touchEndX > touchStartX + 50) changeSlide(-1); // Swipe rechts -> vorige
}

// Sluiten met de Escape toets op PC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});

// Fade animatie voor slider-container
const sliderContainer = document.getElementById('slider-container');
if (sliderContainer) {
    sliderContainer.style.transition = 'opacity 0.3s';
}

