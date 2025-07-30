class Team extends HTMLElement {
    async connectedCallback() {
        const response = await fetch('data/people.json');
        const people = await response.json();
        
        // Filtra solo a los miembros del equipo principal
        const coreTeam = people.filter(person => person.type === 'core');

        let teamCardsHTML = '';
        coreTeam.forEach(person => {
            // Lógica para crear el botón solo si existe la URL externa
            const profileButtonHTML = person.externalUrl
                ? `<a href="${person.externalUrl}" target="_blank" class="cta-button secondary team-link-button">Ver Perfil</a>`
                : '';

            teamCardsHTML += `
                <div class="team-card">
                    <div class="team-image-wrapper">
                        <img src="${person.photoUrl}" alt="Foto de ${person.fullName}" class="team-image team-photo" onerror="this.src='https://placehold.co/300x300/EEE/333?text=Foto'">
                        <img src="${person.avatarUrl}" alt="Avatar de ${person.fullName}" class="team-image team-avatar" onerror="this.src='https://placehold.co/300x300/1a1a1a/FFF?text=Avatar'">
                    </div>
                    <h3>${person.fullName}</h3>
                    <p class="role">${person.role}</p>
                    <p class="bio">${person.bio}</p>
                    <div class="team-card-footer">
                        ${profileButtonHTML}
                    </div>
                </div>
            `;
        });

        this.innerHTML = `
            <section class="container">
                <h2>Los Filósofos</h2>
                <p class="section-subtitle">Las mentes y corazones detrás de cada línea de código, cada nota musical y cada decisión estratégica.</p>
                <div class="team-grid">
                    ${teamCardsHTML}
                </div>
            </section>
        `;
    }
}

customElements.define('mi-team', Team);