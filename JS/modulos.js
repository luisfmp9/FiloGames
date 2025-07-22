const fechaActual = new Date();
const añoActual = fechaActual.getFullYear();

class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="header">
                <div class="nav-container">
                    <a href="/" class="logo">FiloGames</a>
                    <nav>
                        <ul class="nav-menu">
                            <li class="nav-item"><a href="/" class="nav-link active">Inicio</a></li>
                            <li class="nav-item"><a href="/portfolio" class="nav-link">Portafolio</a></li>
                            <li class="nav-item"><a href="/services" class="nav-link">Servicios</a></li>
                            <li class="nav-item"><a href="/team" class="nav-link">Equipo</a></li>
                            <li class="nav-item"><a href="/contact" class="nav-link">Contacto</a></li>
                            <li class="nav-item"><a href="/about" class="nav-link">Sobre Nosotros</a></li>
                        </ul>
                    </nav>
                    <div class="hamburger">
                        <span class="bar"></span><span class="bar"></span><span class="bar"></span>
                    </div>
                </div>
            </header>
        `
    }
}

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="footer">
                <div class="container" style="padding: 40px 0;">
                    <div class="footer-links">
                        <a href="politicas-privacidad">Política de Privacidad</a>
                        <span>|</span>
                        <a href="terminos-condiciones">Términos y Condiciones</a>
                    </div>
                    <p>&copy; ${añoActual} Filo Games. Todos los derechos reservados.</p>
                    <p style="color: var(--color-text-secondary); font-size: 0.9rem;">Hecho con ☕ y 🤔 en Perú.</p>
                </div>
            </footer>
        `
    }
}

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
                <p class="section-subtitle">Una selección de los universos que hemos construido, las historias que hemos contado y los problemas que hemos resuelto.</p>
                
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
            if (project.playUrl) {
                const playText = project.categories.includes('games') ? 'Jugar' : 'Probar';
                buttonsHTML = `<a href="${project.playUrl}" target="_blank" class="cta-button primary">${playText}</a><a href="${project.detailsUrl}" class="cta-button secondary">Detalles</a>`;
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

class Contact extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section id="contact" class="container">
                <h2>Hablemos</h2>
                <p class="section-subtitle">¿Tienes un proyecto en mente? ¿Una idea loca? ¿O simplemente quieres hablar de filosofía y videojuegos? Contáctanos.</p>
                <form action="https://formspree.io/f/manbneaa" method="POST" class="contact-form">
                    <div class="form-group"><input type="text" name="nombre" class="form-control" placeholder="Tu Nombre" required></div>
                    <div class="form-group"><input type="email" name="email" class="form-control" placeholder="Tu Correo Electrónico" required></div>
                    <div class="form-group"><input type="text" name="asunto" class="form-control" placeholder="Asunto"></div>
                    <div class="form-group"><textarea name="mensaje" class="form-control" rows="5" placeholder="Tu Mensaje" required></textarea></div>
                    <div style="text-align: center;"><button type="submit" class="cta-button">Enviar Mensaje</button></div>
                </form>
            </section>
        `
    }
}

class Team extends HTMLElement {
    async connectedCallback() {
        const response = await fetch('data/people.json');
        const people = await response.json();
        
        // Filtra solo a los miembros del equipo principal
        const coreTeam = people.filter(person => person.type === 'core');

        let teamCardsHTML = '';
        coreTeam.forEach(person => {
            teamCardsHTML += `
                <div class="team-card">
                    <div class="team-image-wrapper">
                        <img src="${person.photoUrl}" alt="Foto de ${person.fullName}" class="team-image team-photo">
                        <img src="${person.avatarUrl}" alt="Avatar de ${person.fullName}" class="team-image team-avatar">
                    </div>
                    <h3>${person.fullName}</h3>
                    <p class="role">${person.role}</p>
                    <p class="bio">${person.bio}</p>
                </div>
            `;
        });

        this.innerHTML = `
            <section class="container">
                <h2>Los Filósofos</h2>
                <p class="section-subtitle">Las mentes y corazones detrás de cada línea de código, cada nota musical y cada decisión estratégica.</p>
                <div class="team-grid">
                    ${teamCardsHTML}
                </div>
            </section>
        `;
    }
}

class ProjectTeam extends HTMLElement {
    async connectedCallback() {
        const projectId = this.getAttribute('project-id');
        const sortOrder = this.getAttribute('sort-order'); // Leemos el nuevo atributo

        // Cargar ambas bases de datos
        const peopleResponse = await fetch('../data/people.json');
        const allPeople = await peopleResponse.json();
        
        const portfolioResponse = await fetch('../data/portfolio.json');
        const portfolio = await portfolioResponse.json();

        // Encontrar el proyecto actual y su equipo
        const currentProject = portfolio.find(p => p.id === projectId);
        let projectTeam = [];
        if (currentProject && currentProject.team) {
            projectTeam = currentProject.team;
        }

        // Si sort-order NO es "fixed", barajamos el equipo
        if (sortOrder !== 'fixed') {
            // Algoritmo de Fisher-Yates para barajar el array
            for (let i = projectTeam.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [projectTeam[i], projectTeam[j]] = [projectTeam[j], projectTeam[i]];
            }
        }

        let teamCardsHTML = '';
        projectTeam.forEach(teamMember => {
            const personData = allPeople.find(p => p.id === teamMember.id);
            if (!personData) return;

            const link = personData.externalUrl ? `<a href="${personData.externalUrl}" target="_blank">${personData.nickname}</a>` : personData.nickname;
            
            teamCardsHTML += `
                <div class="team-card">
                    <div class="team-image-wrapper">
                        <img src="../${personData.photoUrl}" alt="Foto de ${personData.fullName}" class="team-image team-photo" onerror="this.src='https://placehold.co/300x300/EEE/333?text=Foto'">
                        <img src="../${personData.avatarUrl}" alt="Avatar de ${personData.fullName}" class="team-image team-avatar" onerror="this.src='https://placehold.co/300x300/1a1a1a/FFF?text=Avatar'">
                    </div>
                    <h3>${link}</h3>
                    <p class="role">${teamMember.role}</p>
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

class SocialMedia extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="container">
                <h2 class="section-title">Síguenos</h2>
                <p class="section-subtitle">Únete a nuestra comunidad y sé el primero en conocer nuestras últimas noticias, proyectos y reflexiones.</p>
                <div class="social-media-grid">
                    <a href="https://www.instagram.com/filogamesofficial/" target="_blank" class="social-card">
                        <img src="IMG/SocialMedia/Instagram.svg" class="social-image" alt="Instagram">
                    </a>
                    <a href="https://www.youtube.com/@FiloGamesTeam" target="_blank" class="social-card">
                        <img src="IMG/SocialMedia/Youtube.svg" class="social-image" alt="YouTube">
                    </a>
                    <a href="https://www.tiktok.com/@filogamesofficial" target="_blank" class="social-card">
                        <img src="IMG/SocialMedia/TikTok.svg" class="social-image" alt="TikTok">
                    </a>
                    <a href="https://www.linkedin.com/company/filo-games/" target="_blank" class="social-card">
                        <img src="IMG/SocialMedia/Linkdin.svg" class="social-image" alt="LinkedIn">
                    </a>
                </div>
            </section>
        `
    }
}

class Music extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="music-control" class="music-control-button">
                <!-- Ícono de Play -->
                <svg id="play-icon" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <!-- Ícono de Pausa (inicialmente oculto) -->
                <svg id="pause-icon" viewBox="0 0 24 24" style="display: none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            </div>
        `
    }
}

class Features extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container">
                <h2 class="section-title">Nuestra Trayectoria</h2>
                <p class="section-subtitle">Combinamos experiencia, pasión y un historial de éxito para crear productos que dejan huella.</p>
                <div class="features-grid">
                    
                    <!-- Tarjeta 1: Game Jam Finalists (Ícono Mejorado) -->
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 8V2H8a4 4 0 0 0-4 4v4"/>
                                <path d="M12 8h4a4 4 0 0 1 4 4v4h-4"/>
                                <path d="M12 8h-1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h1"/>
                                <path d="M18 22H6a4 4 0 0 1-4-4v-4"/>
                                <path d="M18 22h4v-4a4 4 0 0 0-4-4h-4"/>
                                <path d="M18 22v-1a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">Finalistas Game Jam Plus</h3>
                        <p class="feature-description">Reconocidos como finalisas en la maratón y aceleración de desarrollo de juegos más grande del mundo Game Jam Plus 23/24, validando nuestra capacidad creativa, técnica y de negocios en videojuegos a nivel global.</p>
                    </div>

                    <!-- Tarjeta 2: Años de Experiencia (Ícono Mejorado) -->
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M8 2v4"/>
                                <path d="M16 2v4"/>
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <path d="M3 10h18"/>
                                <path d="M12 16h-4v-4h4v4z"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">+10 Años de Experiencia</h3>
                        <p class="feature-description">Contamos con equipo senior que acumula más de una década de experiencia, liderando y ejecutando proyectos de software, emprendimientos y videojuegos complejos.</p>
                    </div>

                    <!-- Tarjeta 3: Proyectos Lanzados (Ícono Mejorado) -->
                    <div class="feature-card">
                        <div class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 9.5L16.5 12L14 14.5"/>
                                <path d="M10 14.5L7.5 12L10 9.5"/>
                                <path d="M2 12h12"/>
                                <path d="M18 6l4 6l-4 6"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">+20 Proyectos Trabajados</h3>
                        <p class="feature-description">Desde videojuegos independientes, Game Jams, emprendimientos, proyectos para clientes y prototipos hasta experiencia en softwares empresariales y experiencias interactivas que han llegado al mercado y a los usuarios.</p>
                    </div>

                    <!-- Tarjeta 4: Jugadores (Ícono Mejorado) -->
                    <div class="feature-card">
                        <div class="feature-icon">
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="8.5" cy="7" r="4"/>
                                <path d="M22 11h-6"/>
                                <path d="M19 8v6"/>
                            </svg>
                        </div>
                        <h3 class="feature-title">+1000 Jugadores</h3>
                        <p class="feature-description">Nuestras creaciones han sido experimentadas, analizadas, disfrutadas y validadas por una comunidad creciente de más de mil jugadores.</p>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('mi-header', Header);
customElements.define('mi-footer', Footer);
customElements.define('mi-features', Features);
customElements.define('mi-team', Team);
customElements.define('mi-project-team', ProjectTeam);
customElements.define('mi-social-media', SocialMedia);
customElements.define('mi-contact', Contact);
customElements.define('mi-music', Music);
customElements.define('mi-portfolio', Portfolio);