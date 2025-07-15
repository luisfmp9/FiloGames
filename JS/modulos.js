const fechaActual = new Date();
const añoActual = fechaActual.getFullYear();

class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="header">
                <div class="nav-container">
                    <a href="index.html" class="logo">FiloGames</a>
                    <nav>
                        <ul class="nav-menu">
                            <li class="nav-item"><a href="/" class="nav-link active">Inicio</a></li>
                            <li class="nav-item"><a href="portfolio" class="nav-link">Portafolio</a></li>
                            <li class="nav-item"><a href="services" class="nav-link">Servicios</a></li>
                            <li class="nav-item"><a href="team" class="nav-link">Equipo</a></li>
                            <li class="nav-item"><a href="contact" class="nav-link">Contacto</a></li>
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
                    <p>&copy; ${añoActual} Filo Games. Todos los derechos reservados.</p>
                    <p style="color: var(--color-text-secondary); font-size: 0.9rem;">Hecho con ☕ y 🤔 en Perú.</p>
                </div>
            </footer>
        `
    }
}

class Contact extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section id="contact" class="container">
                <h2>Hablemos</h2>
                <p class="section-subtitle">¿Tienes un proyecto en mente? ¿Una idea loca? ¿O simplemente quieres hablar de filosofía y videojuegos? Contáctanos.</p>
                <form class="contact-form">
                    <div class="form-group"><input type="text" class="form-control" placeholder="Tu Nombre"></div>
                    <div class="form-group"><input type="email" class="form-control" placeholder="Tu Correo Electrónico"></div>
                    <div class="form-group"><input type="text" class="form-control" placeholder="Asunto"></div>
                    <div class="form-group"><textarea class="form-control" rows="5" placeholder="Tu Mensaje"></textarea></div>
                    <div style="text-align: center;"><button type="submit" class="cta-button">Enviar Mensaje</button></div>
                </form>
            </section>
        `
    }
}

class Team extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="container">
                <h2>Los Filósofos</h2>
                <p class="section-subtitle">Las mentes y corazones detrás de cada línea de código, cada nota musical y cada decisión estratégica.</p>
                <div class="team-grid">
                    <div class="team-card">
                        <div class="team-image-wrapper"><img src="https://placehold.co/300x300/EEE/333?text=Foto+Luis" alt="Foto de Luis Mercado" class="team-image team-photo"><img src="https://placehold.co/300x300/1a1a1a/FFF?text=Avatar+L" alt="Avatar de Luis Mercado" class="team-image team-avatar"></div>
                        <h3>Luis Mercado</h3><p class="role">Gerente General & Dev</p><p class="bio">Conecta la visión filosófica con la ejecución técnica, liderando el equipo hacia nuevos horizontes creativos.</p>
                    </div>
                    <div class="team-card">
                        <div class="team-image-wrapper"><img src="https://placehold.co/300x300/EEE/333?text=Foto+Dáigoro" alt="Foto de Dáigoro" class="team-image team-photo"><img src="https://placehold.co/300x300/1a1a1a/FFF?text=Avatar+D" alt="Avatar de Dáigoro" class="team-image team-avatar"></div>
                        <h3>Dáigoro</h3><p class="role">Músico y Compositor</p><p class="bio">El alma sonora de Filo Games. Crea las atmósferas que dan vida y emoción a nuestros mundos.</p>
                    </div>
                    <div class="team-card">
                        <div class="team-image-wrapper"><img src="https://placehold.co/300x300/EEE/333?text=Foto+Alvaro" alt="Foto de Alvaro" class="team-image team-photo"><img src="https://placehold.co/300x300/1a1a1a/FFF?text=Avatar+A" alt="Avatar de Alvaro" class="team-image team-avatar"></div>
                        <h3>Alvaro</h3><p class="role">Programador Principal</p><p class="bio">El arquitecto de la lógica. Transforma ideas complejas en código limpio, eficiente y funcional.</p>
                    </div>
                    <div class="team-card">
                        <div class="team-image-wrapper"><img src="https://placehold.co/300x300/EEE/333?text=Foto+Joaquin" alt="Foto de Joaquin" class="team-image team-photo"><img src="https://placehold.co/300x300/1a1a1a/FFF?text=Avatar+J" alt="Avatar de Joaquin" class="team-image team-avatar"></div>
                        <h3>Joaquin</h3><p class="role">Finanzas y Estrategia</p><p class="bio">Asegura que la creatividad tenga una base sólida, gestionando los recursos para garantizar la viabilidad de los proyectos.</p>
                    </div>
                    <div class="team-card">
                        <div class="team-image-wrapper"><img src="https://placehold.co/300x300/EEE/333?text=Foto+Mafer" alt="Foto de María Fernanda" class="team-image team-photo"><img src="https://placehold.co/300x300/1a1a1a/FFF?text=Avatar+M" alt="Avatar de María Fernanda" class="team-image team-avatar"></div>
                        <h3>María Fernanda</h3><p class="role">Gerente de Ventas</p><p class="bio">Crea los puentes entre nuestros proyectos y el mundo, forjando alianzas y oportunidades de negocio.</p>
                    </div>
                </div>
            </section>
        `
    }
}

class RRSS extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="Contact">
            <div class="RRSS">
                <h3 class="text-center">Follow Us | Síguenos</h3>
                <div class="custom-divRRSS">
                    <a href="https://www.instagram.com/filogamesofficial/" target="_blank" class="custom-aRRSS">
                        <img style="max-width: 200px" src="https://img.itch.zone/aW1nLzE3ODcwOTQ2LnBuZw==/original/m59VQd.png" class="custom-imgRS">
                    </a>
                </div>
                <div class="custom-divRRSS">
                    <a href="https://www.youtube.com/@FiloGamesTeam" target="_blank" class="custom-aRRSS"><img style="max-width: 200px" src="https://img.itch.zone/aW1nLzE3ODcxMjkxLnBuZw==/original/ATgXa3.png" class="custom-imgRS"></a>
                </div>
                <div class="custom-divRRSS">
                    <a href="https://www.tiktok.com/@filogamesofficial" target="_blank" class="custom-aRRSS"><img style="max-width: 200px" src="https://img.itch.zone/aW1nLzE3ODcxMTI0LnBuZw==/original/VlWP9i.png" class="custom-imgRS"></a>
                </div>
                <div class="custom-divRRSS">
                    <a href="https://www.linkedin.com/company/filo-games/" target="_blank" class="custom-aRRSS"><img style="max-width: 200px" src="https://img.itch.zone/aW1nLzE3ODcxMTY2LnBuZw==/original/16l8Dg.png" class="custom-imgRS"></a>
                </div>
            </div>
        </section>
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
                    <div class="feature-card">
                        <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M9.17 9.17a5 5 0 0 0-2.34 1.11"/><path d="M14.83 9.17a5 5 0 0 1 2.34 1.11"/><path d="M12 12a5 5 0 0 0-5 5v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2a5 5 0 0 0-5-5Z"/></svg></div>
                        <h3 class="feature-title">Finalistas Game Jam Plus</h3>
                        <p class="feature-description">Reconocidos en la competencia de desarrollo de juegos más grande del mundo (ed. 23/24).</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg></div>
                        <h3 class="feature-title">+10 Años de Experiencia</h3>
                        <p class="feature-description">Nuestro equipo senior acumula más de una década creando soluciones de software y videojuegos.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="10" y1="4" x2="14" y2="20"/></svg></div>
                        <h3 class="feature-title">+20 Proyectos Lanzados</h3>
                        <p class="feature-description">Desde videojuegos completos y prototipos hasta software empresarial y experiencias interactivas.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                        <h3 class="feature-title">+1000 Jugadores</h3>
                        <p class="feature-description">Nuestras creaciones han sido disfrutadas por una comunidad creciente de más de mil jugadores.</p>
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
customElements.define('mi-rrss', RRSS);
customElements.define('mi-contact', Contact);