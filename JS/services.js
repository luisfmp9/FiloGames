document.addEventListener('DOMContentLoaded', function() {
    // --- LÓGICA PARA EL CARRUSEL DE PRECIOS (SI EXISTE) ---
    const carousel = document.getElementById('pricing-carousel');
    if (carousel) {
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
        
        const updateButtons = () => {
            const scrollLeft = carousel.scrollLeft;
            const scrollWidth = carousel.scrollWidth;
            const width = carousel.clientWidth;
            prevButton.disabled = scrollLeft <= 0;
            nextButton.disabled = scrollLeft + width >= scrollWidth - 10;
        };

        const scrollToNext = () => {
            const card = carousel.querySelector('.pricing-card');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = 30;
                carousel.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
            }
        };

        const scrollToPrev = () => {
            const card = carousel.querySelector('.pricing-card');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = 30;
                carousel.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
            }
        };

        nextButton.addEventListener('click', scrollToNext);
        prevButton.addEventListener('click', scrollToPrev);
        carousel.addEventListener('scroll', updateButtons);
        updateButtons();
    }
});