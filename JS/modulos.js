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
            <footer class="footer" style="padding: 40px 0;>
                <div class="container" style="padding: 40px 0;">
                    <p>&copy; ${añoActual} Filo Games. Todos los derechos reservados.</p>
                    <p style="color: var(--color-text-secondary); font-size: 0.9rem;">Hecho con ☕ y 🤔 en Perú.</p>
                </div>
            </footer>
        `
    }
}

class Features extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="features">
                <div class="feature">
                    <img src="IMG/FiloGamesCertificado.png" alt="Certificado de fase de aceleración">
                    <h3 class="featureText">Game Jam Plus 23/24 Finalists</h3>
                    <p>We had the great experience of going through the different phases of the Game Jam Plus until the final, where we learned many things as a team with the Chuter project.</p>
                </div>
                <div class="feature">
                    <h3 class="featureText">+10 Years of Experience in the Industry</h3>
                    <p>We have over 10 years of experience developing video games, software, and more. We've developed over 10 video games, countless prototypes, software projects, and more.</p>
                </div>
                <div class="feature">
                    <h3 class="featureText">Philosophical Approach to Video Games</h3>
                    <p>We love cultural, social, artistic and philosophical depth in our video games and products.</p>
                </div>
                <div class="feature">
                    <h3 class="featureText">Innovation & Quality</h3>
                    <p>We care about the quality and contribution of our video games, such as gameplay, narrative and distinctive art.</p>
                </div>
            </section>
        `
    }
}
customElements.define('mi-header', Header);
customElements.define('mi-footer', Footer);
customElements.define('mi-features', Features);