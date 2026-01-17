
document.getElementById("whatsappForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const whatsappNumber = "212614364583"; // ← CHANGE to her real number (NO +)

    const text =
        `Bonjour, je souhaite prendre rendez-vous.%0A%0A` +
        `Nom : ${name}%0A` +
        `Téléphone : ${phone}%0A` +
        `Message : ${message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(url, "_blank");
});
// DONE FOR THE WHATSAPP FORM JS FUNCTIONALITY
const luxSection = document.querySelector(".lux");

const luxImages = [
    "assets/IMG/hair-air.png",
    "assets/IMG/mirror.png",
    "assets/IMG/hair-wash.png"
];

let luxIndex = 0;

    // Initial image
luxSection.style.backgroundImage = `url(${luxImages[0]})`;

setInterval(() => {
    luxIndex = (luxIndex + 1) % luxImages.length;
    luxSection.style.backgroundImage = `url(${luxImages[luxIndex]})`;
}, 3000);
// DONE FOR THE LUX SECTION IMAGE SLIDER
const cardsGrid = document.querySelector(".cards-grid");
const cards = document.querySelectorAll(".card");
const btnLeft = document.querySelector(".cards-arrow.left");
const btnRight = document.querySelector(".cards-arrow.right");

let currentIndex = 0;
let autoSlideInterval;
let isPaused = false;

function getVisibleCards() {
    return window.innerWidth <= 768 ? 1 : 3;
}

function getMaxIndex() {
    return cards.length - getVisibleCards();
}

function getCardWidth() {
    return cards[0].offsetWidth + 30; // card width + gap
}

function updateSlider() {
    cardsGrid.style.transform =
        `translateX(-${currentIndex * getCardWidth()}px)`;
}

/* NEXT / PREV WITH LIMIT */
function nextSlide() {
    if (currentIndex >= getMaxIndex()) {
        currentIndex = 0; // loop back
    } else {
        currentIndex++;
    }
    updateSlider();
}

function prevSlide() {
    if (currentIndex <= 0) {
        currentIndex = getMaxIndex(); // loop to end
    } else {
        currentIndex--;
    }
    updateSlider();
}

/* AUTO SLIDE */
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (!isPaused) nextSlide();
    }, 4000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

/* EVENTS */
btnRight.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});

btnLeft.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});

/* HOVER PAUSE */
cardsGrid.addEventListener("mouseenter", () => isPaused = true);
cardsGrid.addEventListener("mouseleave", () => isPaused = false);

/* TOUCH */
let startX = 0;

cardsGrid.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isPaused = true;
});

cardsGrid.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    isPaused = false;
    resetAutoSlide();
});

/* RESET ON RESIZE */
window.addEventListener("resize", () => {
    currentIndex = 0;
    updateSlider();
});

startAutoSlide();
/*DONE CARDS ABOVE==================================== */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); 

/*DONE REVEAL ABOVE==================================== */
