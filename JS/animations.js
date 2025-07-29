document.addEventListener('DOMContentLoaded', function() {
// --- LÓGICA PARA ANIMACIONES DE SCROLL ---
    const sections = document.querySelectorAll('.container, .cta-section, .advantage-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});