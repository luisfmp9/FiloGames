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
                        <li><a href="/FiloGames">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="contacto">Contact</a></li>
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
                            <h5 class="white-text">Contact Me</h5>
                            <p class="grey-text text-lighten-4">You can contact me through these means :)</p>
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