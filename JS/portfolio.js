document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica del Filtro del Portafolio (sin cambios) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (tabButtons.length > 0 && portfolioItems.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    item.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
                });
            });
        });
    }
});