document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica del Menú Hamburguesa ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // --- Lógica para marcar el enlace activo en el menú (CORREGIDA) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname; // Obtiene la ruta completa (ej. "/FiloGames/portfolio.html")

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        link.classList.remove('active');

        // Compara la ruta del enlace con la ruta actual
        if (currentPath === linkPath) {
            link.classList.add('active');
        }
    });

    // --- Lógica para el Filtro del Portafolio ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (tabButtons.length > 0 && portfolioItems.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. Quita la clase 'active' de todos los botones
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // 2. Añade la clase 'active' al botón clickeado
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // 3. Muestra u oculta los items del portafolio
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block'; // Muestra el item
                    } else {
                        item.style.display = 'none'; // Oculta el item
                    }
                });
            });
        });
    }
});