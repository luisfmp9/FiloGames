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

    // --- Lógica para marcar el enlace activo en el menú ---
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo actual (ej. "portfolio.html")

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Quita la clase 'active' que pueda estar en el HTML
        link.classList.remove('active'); 

        // Si el enlace apunta a la página actual, o si estamos en index.html y el enlace es a "Inicio"
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ... (El código del filtro del portafolio, si lo tienes, iría aquí) ...
});