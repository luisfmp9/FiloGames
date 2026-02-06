class Portfolio extends HTMLElement {
    async connectedCallback() {
        const response = await fetch('data/portfolio.json');
        const allProjects = await response.json();

        const projects = allProjects
            .filter(project => project.show)
            .sort((a, b) => b.priority - a.priority);

        this.innerHTML = `
            <section id="portfolio" class="container">
                <h2>Nuestro Trabajo</h2>
                <p class="section-subtitle">Una selección de los mejores universos que hemos construido, las historias que hemos contado y los problemas que hemos resuelto.</p>
                
                <div class="portfolio-tabs">
                    <button class="tab-button active" data-filter="all">Todo</button>
                    <button class="tab-button" data-filter="games">Videojuegos</button>
                    <button class="tab-button" data-filter="mobile">Móviles</button>
                    <button class="tab-button" data-filter="web">Sitios Web</button>
                    <button class="tab-button" data-filter="arvr">AR/VR</button>
                </div>
                <div class="portfolio-grid"></div>
            </section>
        `;

        const grid = this.querySelector('.portfolio-grid');
        
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'portfolio-item';
            // Guardamos las categorías como un string separado por comas
            card.dataset.categories = project.categories.join(',');

            let buttonsHTML = '';
            let mainUrl = '';
            let mainText = '';
            
            if (Array.isArray(project.buttons) && project.buttons.length > 0) {
                // Buscamos el primario, o usamos el primero
                const primaryBtn = project.buttons.find(b => b.style === 'primary') || project.buttons[0];
                mainUrl = primaryBtn.url;
                mainText = primaryBtn.text;
            } else if (typeof project.buttons === 'string') {
                // Es solo un string (URL)
                mainUrl = project.buttons;
                mainText = project.categories.includes('games') ? 'Jugar' : 'Probar';
            }

            // Construcción del HTML de botones
            if (mainUrl) {
                buttonsHTML = `<a href="${mainUrl}" target="_blank" class="cta-button primary">${mainText}</a><a href="${project.detailsUrl}" class="cta-button secondary">Detalles</a>`;
            } else {
                buttonsHTML = `<a href="${project.detailsUrl}" class="cta-button secondary full-width">Detalles del Proyecto</a>`;
            }

            const imageFitStyle = project.imageFit || 'cover';
            const imageBgStyle = project.imageBg || 'var(--color-surface)';

            card.innerHTML = `
                <div class="portfolio-image-container" style="background-color: ${imageBgStyle};">
                    <img src="${project.image}" alt="Imagen de ${project.title}" style="object-fit: ${imageFitStyle};" onerror="this.onerror=null;this.src='https://placehold.co/600x400/000/FFF?text=Imagen+Rota';">
                </div>
                <div class="portfolio-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="portfolio-buttons">${buttonsHTML}</div>
                </div>
            `;
            grid.appendChild(card);
        });

        this.initializeFilters();
    }

    initializeFilters() {
        const filterButtons = this.querySelectorAll('.portfolio-tabs .tab-button');
        const portfolioItems = this.querySelectorAll('.portfolio-item');
        const allButton = this.querySelector('[data-filter="all"]');
        
        let activeFilters = new Set();

        const applyFilters = () => {
            portfolioItems.forEach(item => {
                const itemCategories = new Set(item.dataset.categories.split(','));
                
                // Si no hay filtros activos, o el filtro "Todo" está activo, mostrar todo
                if (activeFilters.size === 0) {
                    item.style.display = 'flex';
                    return;
                }
                
                // Comprobar si el item tiene TODAS las categorías activas
                const isVisible = [...activeFilters].every(filter => itemCategories.has(filter));
                item.style.display = isVisible ? 'flex' : 'none';
            });
        };

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                if (filter === 'all') {
                    activeFilters.clear();
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    allButton.classList.add('active');
                } else {
                    allButton.classList.remove('active');
                    if (activeFilters.has(filter)) {
                        activeFilters.delete(filter);
                        button.classList.remove('active');
                    } else {
                        activeFilters.add(filter);
                        button.classList.add('active');
                    }

                    // Si no queda ningún filtro, activar "Todo"
                    if (activeFilters.size === 0) {
                        allButton.classList.add('active');
                    }
                }
                
                applyFilters();
            });
        });
    }
}

class ProjectTeam extends HTMLElement {
    async connectedCallback() {
        const projectId = this.getAttribute('project-id');
        const sortOrder = this.getAttribute('sort-order');

        const peopleResponse = await fetch('../data/people.json');
        const allPeople = await peopleResponse.json();
        
        const portfolioResponse = await fetch('../data/portfolio.json');
        const portfolio = await portfolioResponse.json();

        const currentProject = portfolio.find(p => p.id === projectId);
        let projectTeam = [];
        if (currentProject && currentProject.team) {
            projectTeam = currentProject.team;
        }

        if (sortOrder !== 'fixed') {
            for (let i = projectTeam.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [projectTeam[i], projectTeam[j]] = [projectTeam[j], projectTeam[i]];
            }
        }

        let teamCardsHTML = '';
        projectTeam.forEach(teamMember => {
            const personData = allPeople.find(p => p.id === teamMember.id);
            if (!personData) return;

            const linkButton = personData.externalUrl 
                ? `<a href="${personData.externalUrl}" target="_blank" class="cta-button secondary team-link-button">Ver Perfil</a>` 
                : '';
            
            // Lógica para el nombre: usa el override, si no existe usa el nickname, y si no, el nombre completo.
            const displayName = teamMember.displayName || personData.nickname || personData.fullName;
            const displayRole = teamMember.displayRole || personData.role;

            teamCardsHTML += `
                <div class="team-card">
                    <div class="team-image-wrapper">
                        <img src="../${personData.photoUrl}" alt="Foto de ${personData.fullName}" class="team-image team-photo" onerror="this.src='https://placehold.co/300x300/EEE/333?text=Foto'">
                        <img src="../${personData.avatarUrl}" alt="Avatar de ${personData.fullName}" class="team-image team-avatar" onerror="this.src='https://placehold.co/300x300/1a1a1a/FFF?text=Avatar'">
                    </div>
                    <h3>${displayName}</h3>
                    <p class="role">${displayRole}</p>
                    <div class="team-card-footer">
                        ${linkButton}
                    </div>
                </div>
            `;
        });

        this.innerHTML = `
            <section class="container">
                <h2>Equipo del Proyecto</h2>
                <div class="team-grid">
                    ${teamCardsHTML}
                </div>
            </section>
        `;
    }
}

class ProjectDetail extends HTMLElement {
    async connectedCallback() {
        const projectId = this.getAttribute('project-id');
        if (!projectId) return;
        
        const portfolioResponse = await fetch('../data/portfolio.json');
        const portfolio = await portfolioResponse.json();
        const project = portfolio.find(p => p.id === projectId);

        if (!project) {
            this.innerHTML = `<div class="container"><p>Proyecto no encontrado.</p></div>`;
            return;
        }

        // GALERÍA
        let galleryHTML = '';
        if (project.gallery && project.gallery.length > 0) {
            project.gallery.forEach(imgUrl => {
                // Aseguramos que las rutas de la galería también sean relativas a la raíz
                const correctedUrl = imgUrl.startsWith('../') ? imgUrl : `../${imgUrl}`;
                galleryHTML += `<img src="${correctedUrl}" alt="Imagen de la galería de ${project.title}" class="gallery-image">`;
            });
        }

        // BOTONES DE ACCIÓN
        let mainButtonsHTML = '';

        if (Array.isArray(project.buttons) && project.buttons.length > 0) {
            // CASO A: Array de objetos (Varios botones)
            mainButtonsHTML = project.buttons.map(btn => 
                `<a href="${btn.url}" target="_blank" class="cta-button ${btn.style}">${btn.text}</a>`
            ).join(''); // Quitamos el espacio extra, CSS grid/flex manejará el gap
        } else if (typeof project.buttons === 'string') {
            // CASO B: String simple (Un solo botón, lógica antigua compatible)
            const buttonText = project.categories.includes('games') ? 'Jugar' : 'Probar';
            // Usamos platforms si existe, si no string vacío
            const platformText = project.platforms ? ` (${project.platforms})` : '';
            mainButtonsHTML = `<a href="${project.buttons}" target="_blank" class="cta-button primary">${buttonText}${platformText}</a>`;
        }

        let authorsHTML = '';
        
        if (Array.isArray(project.authors) && project.authors.length > 0) {
            // CASO A: Array de objetos
            authorsHTML = project.authors.map(author => {
                const target = author.url.startsWith('#') ? '_self' : '_blank';
                return `<a href="${author.url}" target="${target}" class="cta-button secondary metadata-link" style="margin-right: 5px; margin-bottom: 5px; font-size: 0.85em;">${author.name}</a>`;
            }).join('');
        } else {
            // CASO B: String simple (ahora usamos project.authors directamente) o fallback
            const authorName = typeof project.authors === 'string' ? project.authors : 'Ver Equipo';
            authorsHTML = `<a href="#project-team-section" class="cta-button secondary metadata-link">${authorName}</a>`;
        }

        this.innerHTML = `
            <header class="game-header" style="background-image: linear-gradient(rgba(10, 10, 26, 0.8), rgba(10, 10, 26, 0.6)), url('${project.headerImage}');">
                <h1 class="project-title">${project.title}</h1>
                <p class="tagline">${project.tagline}</p>
            </header>

            <div class="container game-page-container">
                <div class="main-content">
                    <h3>Sobre el Juego</h3>
                    <p>${project.about || project.description}</p>
                    <h4>Galería</h4>
                    <div class="gallery-grid">${galleryHTML}</div>
                </div>

                <aside class="sidebar">
                    <div class="metadata-box action-buttons">
                        ${mainButtonsHTML}
                    </div>
                    <div class="metadata-box">
                        <ul class="metadata-list">
                            <li><span class="label">Estado</span> <span class="value">${project.status || 'No Especificado'}</span></li>
                            <li><span class="label">Plataformas</span> <span class="value">${project.platforms || 'No especificado'}</span></li>
                            
                            <li style="flex-direction: column; align-items: flex-start;">
                                <span class="label" style="margin-bottom: 0.5rem;">Autores</span> 
                                <div class="value" style="display: flex; flex-wrap: wrap;">
                                    ${authorsHTML}
                                </div>
                            </li>

                            <li><span class="label">Género</span> <span class="value">${project.genre || 'No especificado'}</span></li>
                            <li><span class="label">Etiquetas</span> <span class="value">${project.tags || 'No especificado'}</span></li>
                        </ul>
                    </div>
                </aside>
            </div>
            
            <mi-project-team project-id="${projectId}" id="project-team-section"></mi-project-team>
        `;
    }
}

customElements.define('mi-project-team', ProjectTeam);
customElements.define('mi-portfolio', Portfolio);
customElements.define('mi-project-detail', ProjectDetail);