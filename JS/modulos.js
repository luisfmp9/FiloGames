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
                        <li><a href="#hero">Inicio</a></li>
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

customElements.define('mi-header', Header);
customElements.define('mi-footer', Footer);