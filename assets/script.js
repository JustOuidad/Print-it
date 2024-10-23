const slides = [
    {
        "image": "slide1.jpg",
        "tagLine": "Impressions tous formats <span>en boutique et en ligne</span>"
    },
    {
        "image": "slide2.jpg",
        "tagLine": "Tirages haute définition grand format <span>pour vos bureaux et events</span>"
    },
    {
        "image": "slide3.jpg",
        "tagLine": "Grand choix de couleurs <span>de CMJN aux pantones</span>"
    },
    {
        "image": "slide4.png",
        "tagLine": "Autocollants <span>avec découpe laser sur mesure</span>"
    }
];

// Sélectionne les boutons fléchés
const arrows = document.querySelectorAll('.arrow');

// Applique les styles nécessaires pour retirer le fond gris
arrows.forEach((arrow) => {
    arrow.style.background = 'none'; 
    arrow.style.border = 'none'; 
    arrow.style.padding = '0'; 
    arrow.style.cursor = 'pointer'; 

    // Retire l'effet de contour lors du focus
    arrow.addEventListener('focus', () => {
        arrow.style.outline = 'none';
    });

    // Empêche le fond gris lors du clic
    arrow.addEventListener('mousedown', () => {
        arrow.style.backgroundColor = 'transparent';
    });
});

// Sélection des éléments nécessaires
const bannerImg = document.querySelector('.banner-img');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

// Fonction pour mettre à jour les points indicateurs
function updateDots(index) {
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('dot_selected'); // Ajoute la classe pour le point actif
        } else {
            dot.classList.remove('dot_selected'); // Supprime la classe des autres points
        }
    });
}

// Fonction pour mettre à jour l'image et le texte
function updateCarousel(index) {
    // Gestion des limites d'index
    if (index < 0) {
        currentIndex = slides.length - 1; // pointe sur la dernière slide
    } else if (index >= slides.length) {
        currentIndex = 0; // pointe vers la première slide
    } else {
        currentIndex = index; // Sinon, l'index donné
    }

    // Mettre à jour l'image
    const imagePath = `./assets/images/slideshow/${slides[currentIndex].image}`;
    bannerImg.src = imagePath;
    bannerImg.alt = `Slide ${currentIndex + 1}`;

    // Mettre à jour le texte
    const tagLine = slides[currentIndex].tagLine;
    document.querySelector('p').innerHTML = tagLine;

    console.log(`Diapositive actuelle : ${currentIndex + 1}`);
    updateDots(currentIndex); // Met à jour les points indicateurs
}

// Gestionnaire d'événements pour les flèches
arrowLeft.addEventListener('click', function () {
    updateCarousel(currentIndex - 1); // Décrémenter l'index pour aller à la diapositive précédente
});

arrowRight.addEventListener('click', function () {
    updateCarousel(currentIndex + 1); // Incrémenter l'index pour aller à la diapositive suivante
});

// Afficher la première diapositive au chargement de la page
updateCarousel(currentIndex);
// Fonction pour démarrer le défilement automatique
function startAutoSlide() {
    autoSlideInterval = setInterval(function () {
        updateCarousel(currentIndex + 1); // Passe à la diapositive suivante toutes les 5 secondes (5000 ms)
    }, 5000); // Change de slide toutes les 5 secondes
}

// Fonction pour réinitialiser le défilement automatique après interaction
function resetAutoSlide() {
    clearInterval(autoSlideInterval); // Arrête le précédent intervalle
    startAutoSlide(); // Relance un nouvel intervalle
}

// Afficher la première diapositive au chargement de la page
updateCarousel(currentIndex);

// Démarrer le défilement automatique
startAutoSlide();