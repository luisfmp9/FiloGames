document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica del Menú Hamburguesa (para todas las páginas) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // --- Lógica de las Pestañas del Portafolio (solo se ejecuta si encuentra los elementos) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (tabButtons.length > 0 && portfolioItems.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Manejar clase activa en botones
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Mostrar/ocultar items del portafolio
                portfolioItems.forEach(item => {
                    // Usamos display: none/block para la lógica de filtrado
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});