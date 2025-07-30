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
                        <p class="feature-description">Contamos con miembros senior que acumulan más de una década de experiencia, liderando y ejecutando proyectos de software, emprendimientos y videojuegos complejos.</p>
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

customElements.define('mi-features', Features);