class Contact extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section id="contact" class="container">
                <h2>Hablemos</h2>
                <p class="section-subtitle">¿Tienes un proyecto en mente? ¿Una idea loca? ¿O simplemente quieres hablar de filosofía y videojuegos? Contáctanos.</p>
                <form action="https://api.web3forms.com/submit" method="POST" class="contact-form">
                    <input type="hidden" name="access_key" value="0127c141-1e7e-4df1-afb2-12425bb6d3e9">
                    <div class="form-group"><input type="text" name="nombre" class="form-control" placeholder="Tu Nombre" required></div>
                    <div class="form-group"><input type="email" name="email" class="form-control" placeholder="Tu Correo Electrónico" required></div>
                    <div class="form-group"><input type="text" name="asunto" class="form-control" placeholder="Asunto"></div>
                    <div class="form-group"><textarea name="mensaje" class="form-control" rows="5" placeholder="Tu Mensaje"></textarea></div>
                    <input type="hidden" name="redirect" value="https://www.filogames.com/thanks">
                    <div style="text-align: center;"><button type="submit" class="cta-button">Contactar</button></div>
                    <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
                </form>
            </section>
        `
    }
}

customElements.define('mi-contact', Contact);