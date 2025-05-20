const carouselContainer = document.querySelector('.logo-carousel-container');
const carousel = document.getElementById('logoCarousel');
const logoItems = document.querySelectorAll('.logo-item');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const itemWidth = logoItems[0].offsetWidth + 30;
const cloneCount = 2;
let currentIndex = cloneCount;
let isDragging = false;
let startX;
let scrollLeft;

function cloneLogos() {
    const firstClones = Array.from(logoItems).slice(0, cloneCount).map(node => node.cloneNode(true));
    const lastClones = Array.from(logoItems).slice(-cloneCount).map(node => node.cloneNode(true));

    firstClones.forEach(clone => carousel.prepend(clone));
    lastClones.forEach(clone => carousel.appendChild(clone));
}

function updateCarousel(instant = false) {
    const translateX = -currentIndex * itemWidth;
    carousel.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(${translateX}px)`;
}

function scrollLogos(direction) {
    currentIndex += direction;
    updateCarousel();
    setTimeout(() => {
        if (currentIndex <= 0) {
            currentIndex = logoItems.length;
            updateCarousel(true);
        } else if (currentIndex >= logoItems.length + cloneCount * 2 -1) {
            currentIndex = cloneCount -1;
            updateCarousel(true);
        }
    }, 500);
}

carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing';
});

carousel.addEventListener('mouseleave', () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
});

carousel.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1;
    carousel.scrollLeft = scrollLeft - walk;
});

carousel.addEventListener('scroll', () => {
    if (!isDragging) {
        const scrollPosition = carousel.scrollLeft;
        const approximateIndex = Math.round(scrollPosition / itemWidth);

        if (approximateIndex <= 0) {
            currentIndex = logoItems.length;
            updateCarousel(true);
            carousel.scrollLeft = currentIndex * itemWidth;
        } else if (approximateIndex >= logoItems.length + cloneCount -1) {
            currentIndex = cloneCount -1;
            updateCarousel(true);
            carousel.scrollLeft = currentIndex * itemWidth;
        } else {
            currentIndex = approximateIndex;
        }
    }
});


prevButton.addEventListener('click', () => {
    scrollLogos(-1);
});

nextButton.addEventListener('click', () => {
    scrollLogos(1);
});

cloneLogos();
updateCarousel(true);
carousel.scrollLeft = currentIndex * itemWidth;
carousel.style.cursor = 'grab';