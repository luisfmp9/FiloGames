class Team extends HTMLElement {
    async connectedCallback() {
        const response = await fetch('data/people.json');
        const people = await response.json();
        
        // Filtra solo a los miembros del equipo principal
        const coreTeam = people.filter(person => person.type === 'core');

        let teamCardsHTML = '';
        coreTeam.forEach(person => {
            teamCardsHTML += `
                <div class="team-card">
                    <div class="team-image-wrapper">
                        <img src="${person.photoUrl}" alt="Foto de ${person.fullName}" class="team-image team-photo">
                        <img src="${person.avatarUrl}" alt="Avatar de ${person.fullName}" class="team-image team-avatar">
                    </div>
                    <h3>${person.fullName}</h3>
                    <p class="role">${person.role}</p>
                    <p class="bio">${person.bio}</p>
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