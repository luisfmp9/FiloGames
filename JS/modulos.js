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
                            <li class="nav-item nav-item--has-dropdown">
                                <a href="/about" class="nav-link">Sobre Nosotros</a>
                                <ul class="submenu">
                                    <li class="submenu-item"><a href="/team" class="nav-link">Equipo</a></li>
                                    </ul>
                            </li>
                            <li class="nav-item"><a href="/comunidad" class="nav-link">Comunidad</a></li>
                            <li class="nav-item"><a href="/contact" class="nav-link">Contacto</a></li>
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
                        <a href="/politicas-privacidad">Política de Privacidad</a>
                        <span>|</span>
                        <a href="/terminos-condiciones">Términos y Condiciones</a>
                    </div>
                    <p>&copy; ${añoActual} Filo Games. Todos los derechos reservados.</p>
                    <p style="color: var(--color-text-secondary); font-size: 0.9rem;">Hecho con ☕ y 🤔 en Perú.</p>
                </div>
            </footer>
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

customElements.define('mi-header', Header);
customElements.define('mi-footer', Footer);
customElements.define('mi-music', Music);