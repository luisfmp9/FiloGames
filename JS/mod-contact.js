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

customElements.define('mi-contact', Contact);