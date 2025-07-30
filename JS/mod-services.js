class ServicesPage extends HTMLElement {
    async connectedCallback() {
        const response = await fetch('data/services.json');
        const allServices = await response.json();

        // --- Lógica para el Carrusel de Destacados ---
        const featuredServices = allServices
            .filter(service => service.featured)
            .sort((a, b) => b.priority - a.priority);

        let featuredCardsHTML = '';
        featuredServices.forEach(service => {
            featuredCardsHTML += this.createPricingCard(service);
        });

        // --- Lógica para el Catálogo Completo ---
        let catalogCardsHTML = '';
        allServices.forEach(service => {
            catalogCardsHTML += this.createPricingCard(service);
        });

        this.innerHTML = `
            <section class="container">
                <h2>Servicios Destacados</h2>
                <p class="section-subtitle">Nuestras soluciones más solicitadas, diseñadas para generar el máximo impacto.</p>
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
                <p class="section-subtitle">Todos nuestros productos y servicios. Precios referenciales, quedemos una reunión para conversar sobre tus necesidades y objetivos específicos.</p>
                <!-- Aquí irían los filtros del catálogo en el futuro -->
                <div class="full-catalog-grid">
                    ${catalogCardsHTML}
                </div>
            </section>
        `;
    }

    createPricingCard(service) {
        const priceSymbol = service.currency === 'PEN' ? 'S/' : '$';
        const priceText = service.pricePrefix ? `${service.pricePrefix} ${priceSymbol}${service.price}` : `${priceSymbol}${service.price}`;
        
        let featuresHTML = '';
        service.features.forEach(feature => {
            featuresHTML += `<li>${feature}</li>`;
        });

        return `
            <div class="pricing-card" data-category="${service.category}">
                <div class="pricing-header">
                    <h3>${service.title}</h3>
                    <p class="price">${priceText}</p>
                </div>
                <ul class="pricing-features">${featuresHTML}</ul>
                <a href="#contact-section" class="cta-button">Consultar</a>
            </div>
        `;
    }
}

customElements.define('mi-services-page', ServicesPage);