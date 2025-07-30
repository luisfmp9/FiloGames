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

customElements.define('mi-social-media', SocialMedia);