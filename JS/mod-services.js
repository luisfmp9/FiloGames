class ServicesPage extends HTMLElement {
    constructor() {
        super();
        this.allServices = [];
        this.currentFilter = 'all';
        this.currentSort = 'priority';
    }

    async connectedCallback() {
        const response = await fetch('data/services.json');
        this.allServices = await response.json();
        this.render();
    }

    render() {
        // --- Lógica para el Carrusel de Destacados ---
        const featuredServices = this.allServices
            .filter(service => service.featured)
            .sort((a, b) => b.priority - a.priority);

        let featuredCardsHTML = '';
        featuredServices.forEach(service => {
            featuredCardsHTML += this.createPricingCard(service);
        });

        this.innerHTML = `
            <section class="container">
                <h2>Servicios Destacados</h2>
                <p class="section-subtitle">Nuestras soluciones más solicitadas y con el máximo impacto. Precios Referenciales.</p>
                <div class="pricing-carousel-wrapper">
                    <button id="prev-button" class="carousel-button" aria-label="Anterior">
                        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <div id="pricing-carousel" class="pricing-carousel">
                        <div class="pricing-grid">${featuredCardsHTML}</div>
                    </div>
                    <button id="next-button" class="carousel-button" aria-label="Siguiente">
                        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </section>

            <section class="container">
                <h2>Catálogo Completo</h2>
                <p class="section-subtitle">Explora todas nuestras soluciones. Precios referenciales, contáctanos para una cotización a medida.</p>
                
                <div class="catalog-controls">
                    <div class="filter-group">
                        <label for="category-filter">Filtrar por:</label>
                        <select id="category-filter">
                            <option value="all">Todo</option>
                            <option value="videojuegos">Videojuegos</option>
                            <option value="web">Web</option>
                            <option value="arvr">AR/VR</option>
                            <option value="nfc">Tarjetas NFC</option>
                        </select>
                    </div>
                    <div class="sort-group">
                        <label for="sort-by">Ordenar por:</label>
                        <select id="sort-by">
                            <option value="priority">Popularidad</option>
                            <option value="price-desc">Mayor Precio</option>
                            <option value="price-asc">Menor Precio</option>
                            <option value="impact">Impacto</option>
                        </select>
                    </div>
                </div>

                <div id="full-catalog-grid" class="full-catalog-grid"></div>
            </section>
        `;
        
        this.renderCatalog();
        this.addEventListeners();
    }

    renderCatalog() {
        const catalogGrid = this.querySelector('#full-catalog-grid');
        if (!catalogGrid) return;

        // 1. Filtrar
        let servicesToRender = this.allServices;
        if (this.currentFilter !== 'all') {
            servicesToRender = servicesToRender.filter(service => service.category === this.currentFilter);
        }

        // 2. Ordenar
        servicesToRender.sort((a, b) => {
            switch (this.currentSort) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'impact': return (b.impact || 0) - (a.impact || 0);
                case 'priority':
                default:
                    return (b.priority || 0) - (a.priority || 0);
            }
        });

        // 3. Renderizar
        catalogGrid.innerHTML = servicesToRender.map(service => this.createPricingCard(service)).join('');
    }

    createPricingCard(service) {
        const priceSymbol = service.currency === 'PEN' ? 'S/' : '$';
        
        let priceHTML = `<span class="price-prefix">${service.pricePrefix || ''}</span> <span class="price-currency">${priceSymbol}</span><span class="price-amount">${service.price}</span>`;

        let featuresHTML = service.features.map(feature => `<li>${feature}</li>`).join('');
        
        let badgeHTML = '';
        if (service.badge) {
            badgeHTML = `<div class="badge ${service.badge.type}">${service.badge.text}</div>`;
        }

        return `
            <div class="pricing-card" data-category="${service.category}">
                ${badgeHTML}
                <div class="pricing-header">
                    <h3>${service.title}</h3>
                    <div class="price">${priceHTML}</div>
                </div>
                <ul class="pricing-features">${featuresHTML}</ul>
                <a href="#contact-section" class="cta-button">Consultar</a>
            </div>
        `;
    }

    addEventListeners() {
        // Lógica del Carrusel
        const carousel = this.querySelector('#pricing-carousel');
        if (carousel) { /* ... (lógica del carrusel sin cambios) ... */ }

        // Lógica de Filtros y Ordenamiento del Catálogo
        const categoryFilter = this.querySelector('#category-filter');
        const sortBy = this.querySelector('#sort-by');

        categoryFilter.addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.renderCatalog();
        });

        sortBy.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderCatalog();
        });
    }
}

customElements.define('mi-services-page', ServicesPage);