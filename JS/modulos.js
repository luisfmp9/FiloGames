const fechaActual = new Date();
const añoActual = fechaActual.getFullYear();

class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <nav>
                    <div class="logo">
                        <picture>
                            <source srcset="IMG/logoFilo.webp" type="image/webp">
                            <img src="IMG/logoFilo.png" alt="Filosofía y Videojuegos" class="logo">
                        </picture>
                        <h1 class="logoTexto">Filo Games</h1>
                    </div>
                    <ul class="nav-links">
                        <li><a href="/FiloGames">Inicio</a></li>
                        <li><a href="#">Sobre Nosotros</a></li>
                        <li><a href="#">Servicios</a></li>
                        <li><a href="contacto">Contacto</a></li>
                    </ul>
                    <div class="menu-toggle">&#9776;</div>
                </nav>
            </header>
        `
    }
}

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="page-footer blue darken-4">
                <div class="container">
                    <div class="row center">
                        <div class="col l6 s12">
                            <h5 class="white-text">Contáctame</h5>
                            <p class="grey-text text-lighten-4">Puedes contactarme por estos medios :)</p>
                            <p>luisfermepa9@gmail.com</p>
                        </div>
                        <div class="col l4 offset-l2 s12">
                            <h5 class="white-text">Enlaces</h5>
                            <ul>
                                <li><a class="grey-text text-lighten-3" href="https://www.linkedin.com/in/luisfmp9" target="_blank">Linkedin</a></li>
                                <li><a class="grey-text text-lighten-3" href="https://luisfmp.itch.io/" target="_blank">Itch (Videojuegos)</a></li>
                                <li><a class="grey-text text-lighten-3" href="https://www.instagram.com/luisfmp9/" target="_blank">Instagram</a></li>
                                <li><a class="grey-text text-lighten-3" href="https://www.youtube.com/@Luisfmp" target="_blank">Youtube</a></li>
                                <li><a class="grey-text text-lighten-3" href="/">Sitio Web</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer-copyright grey darken-4">
                    <div class="container">
                        <div class="row">
                            <div class="col s12">
                                <p class="grey-text text-lighten-4 center">© ${añoActual} Luis Fernando Mercado Paredes</p>
                            </div>
                        </div>
                    </div>
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
                    <h3>Finalistas Game Jam Plus 23/24</h3>
                    <p>Tuvimos la grandiosa experiencia de pasar por las distintas fases de la Game Jam Plus hasta la final, donde aprendimos muchas cosas como equipo con el proyecto Chuter.</p>
                </div>
                <div class="feature">
                    <h3>+10 Años de Experiencia en la Industria</h3>
                    <p>Tenemos más de 10 años de experiencia en el desarrollo de videojuegos, software y más. Habiendo desarrollado más de 10 videojuegos, innumerables prototipos, softwares y proyectos</p>
                </div>
                <div class="feature">
                    <h3>Enfoque filosófico en Videojuegos</h3>
                    <p>Nos gusta la profundidad cultural, social, artística y filosófica en nuestros videojuegos y productos.</p>
                </div>
                <div class="feature">
                    <h3>Innovación y calidad</h3>
                    <p>Nos preocupamos por la calidad y aporte de nuestros videojuegos, como la jugabilidad, narrativa y artes distintivos.</p>
                </div>
            </section>
        `
    }
}
customElements.define('mi-header', Header);
customElements.define('mi-footer', Footer);
customElements.define('mi-features', Features);