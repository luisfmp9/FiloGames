window.filoGamesDataCache = {};

class ComunidadPage extends HTMLElement {
    constructor() {
        super();
        this.allPosts = [];
        this.allPeople = [];
        this.filteredPosts = [];
        this.web3formsAccessKey = "0127c141-1e7e-4df1-afb2-12425bb6d3e9";
    }

    async connectedCallback() {
        try {
            let posts, people;
            
            if (window.filoGamesDataCache.posts) {
                posts = window.filoGamesDataCache.posts;
                people = window.filoGamesDataCache.people;
            } else {
                const [postsResponse, peopleResponse] = await Promise.all([
                    fetch('../data/comunidad.json'),
                    fetch('../data/people.json')
                ]);

                if (!postsResponse.ok || !peopleResponse.ok) {
                    throw new Error('Failed to fetch data from one or more sources.');
                }

                posts = await postsResponse.json();
                people = await peopleResponse.json();
                window.filoGamesDataCache = { posts, people };
            }

            this.allPosts = posts;
            this.allPeople = people;
            this.filteredPosts = [...this.allPosts];
            this.render();
        } catch (error) {
            console.error("Error al cargar los datos:", error);
            this.innerHTML = "<p class='container'>Error al cargar el contenido. Por favor, inténtalo de nuevo más tarde.</p>";
        }
    }

    render() {
        const allTags = [...new Set(this.allPosts.flatMap(post => post.tags))];
        const allAuthors = [...new Set(this.allPosts.map(post => post.authorId))]
            .map(authorId => this.allPeople.find(p => p.id === authorId))
            .filter(Boolean); // Filtra por si algún autor no se encuentra

        // Nuevo: Función auxiliar para generar el HTML del newsletter
        const newsletterHTML = (idSuffix) => `
            <div class="newsletter-section">
                <h3 class="newsletter-title">¡Únete a la comunidad de Filo Games!</h3>
                <p class="newsletter-text">Recibe noticias, posts y contenido exclusivo directamente en tu correo.</p>
                <form id="newsletter-form-${idSuffix}" class="newsletter-form">
                    <input type="email" id="newsletter-email-${idSuffix}" placeholder="Escribe tu correo aquí" required>
                    <button type="submit" class="newsletter-button">Quiero recibir actualizaciones</button>
                </form>
                <p id="newsletter-message-${idSuffix}" class="newsletter-message"></p>
            </div>
        `;

        this.innerHTML = `
            <section class="container">
                <h2>Comunidad Filo Games</h2>
                <p class="section-subtitle">Nuestro espacio para compartir artículos, anuncios y reflexiones sobre tecnología, videojuegos y filosofía.</p>
                
                ${newsletterHTML('top')}

                <div class="blog-controls">
                    <input type="search" id="search-input" placeholder="Buscar por título o contenido...">
                    <div class="filter-group">
                        <select id="tag-filter">
                            <option value="all">Todas las Categorías</option>
                            ${allTags.map(tag => `<option value="${tag}">${tag}</option>`).join('')}
                        </select>
                        <select id="author-filter">
                            <option value="all">Todos los Autores</option>
                            ${allAuthors.map(author => `<option value="${author.id}">${author.fullName}</option>`).join('')}
                        </select>
                        <select id="sort-order">
                            <option value="newest">Más Recientes</option>
                            <option value="oldest">Más Antiguos</option>
                        </select>
                    </div>
                </div>

                <div id="post-list-grid" class="post-list-grid"></div>
                ${newsletterHTML('bottom')}
            </section>
        `;
        
        this.renderPosts();
        this.addEventListeners();
    }

    applyFiltersAndSort() {
        const searchTerm = this.querySelector('#search-input').value.toLowerCase();
        const selectedTag = this.querySelector('#tag-filter').value;
        const selectedAuthor = this.querySelector('#author-filter').value;
        const sortOrder = this.querySelector('#sort-order').value;

        // 1. Filtrar
        this.filteredPosts = this.allPosts.filter(post => {
            const searchMatch = post.title.toLowerCase().includes(searchTerm) || post.summary.toLowerCase().includes(searchTerm);
            const tagMatch = selectedTag === 'all' || post.tags.includes(selectedTag);
            const authorMatch = selectedAuthor === 'all' || post.authorId === selectedAuthor;
            return searchMatch && tagMatch && authorMatch;
        });

        // 2. Ordenar
        this.filteredPosts.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        this.renderPosts();
    }

    renderPosts() {
        const postGrid = this.querySelector('#post-list-grid');
        if (this.filteredPosts.length === 0) {
            postGrid.innerHTML = `<p class="no-results">No se encontraron resultados para tu búsqueda.</p>`;
            return;
        }

        postGrid.innerHTML = this.filteredPosts.map(post => {
            const author = this.allPeople.find(p => p.id === post.authorId);
            return `
                <div class="post-card">
                    <a href="comunidad/${post.url}" class="post-card-image-link">
                        <img src="${post.imageUrl}" alt="${post.title}" loading="lazy">
                    </a>
                    <div class="post-card-content">
                        <div class="post-card-tags">
                            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <h3 class="post-card-title"><a href="comunidad/${post.url}">${post.title}</a></h3>
                        <p class="post-card-summary">${post.summary}</p>
                        <div class="post-card-meta">
                            <span>Por ${author ? author.fullName : 'Anónimo'}</span>
                            <span>${new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    addEventListeners() {
        const searchInput = this.querySelector('#search-input');
        const tagFilter = this.querySelector('#tag-filter');
        const authorFilter = this.querySelector('#author-filter');
        const sortOrder = this.querySelector('#sort-order');

        searchInput.addEventListener('input', () => this.applyFiltersAndSort());
        tagFilter.addEventListener('change', () => this.applyFiltersAndSort());
        authorFilter.addEventListener('change', () => this.applyFiltersAndSort());
        sortOrder.addEventListener('change', () => this.applyFiltersAndSort());

        // Nuevo: Manejadores para ambos formularios de newsletter
        this.setupNewsletterForm('#newsletter-form-top', '#newsletter-email-top', '#newsletter-message-top');
        this.setupNewsletterForm('#newsletter-form-bottom', '#newsletter-email-bottom', '#newsletter-message-bottom');

    }

    // Nuevo: Función auxiliar para manejar la lógica de suscripción
    setupNewsletterForm(formSelector, emailSelector, messageSelector) {
        const newsletterForm = this.querySelector(formSelector);
        const newsletterMessage = this.querySelector(messageSelector);

        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const emailInput = this.querySelector(emailSelector);
            const email = emailInput.value;

            const endpoint = "https://api.web3forms.com/submit"; 

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ 
                        access_key: this.web3formsAccessKey,
                        email: email
                    })
                });

                if (response.ok) {
                    newsletterMessage.textContent = '¡Gracias! Ya estás en la lista. ¡Bienvenido!';
                    newsletterMessage.style.color = 'green';
                    emailInput.value = '';
                } else {
                    newsletterMessage.textContent = 'Hubo un problema. Por favor, inténtalo de nuevo.';
                    newsletterMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                newsletterMessage.textContent = 'Error de conexión. Verifica tu internet y vuelve a intentarlo.';
                newsletterMessage.style.color = 'red';
            }
        });
    }
}

// COMPONENTE PARA EL CONTENIDO DE UN POST INDIVIDUAL
class PostContent extends HTMLElement {
    async connectedCallback() {
        const postId = this.getAttribute('post-id');
        if (!postId) return;

        try {
            let posts, people;
            
            if (window.filoGamesDataCache.posts) {
                posts = window.filoGamesDataCache.posts;
                people = window.filoGamesDataCache.people;
            } else {
                const [postsResponse, peopleResponse] = await Promise.all([
                    fetch('../data/comunidad.json'),
                    fetch('../data/people.json')
                ]);

                if (!postsResponse.ok || !peopleResponse.ok) {
                    throw new Error('Failed to fetch data from one or more sources.');
                }

                posts = await postsResponse.json();
                people = await peopleResponse.json();
                window.filoGamesDataCache = { posts, people };
            }
            
            const post = posts.find(p => p.id === postId);
            if (!post) { this.innerHTML = `<p>Post no encontrado.</p>`; return; }
            
            const author = people.find(p => p.id === post.authorId);
            const authorName = author ? author.fullName : 'Anónimo';

            // 2. Actualiza dinámicamente el <head> de la página
            document.title = `${post.title} - Filo Games`;
            document.querySelector('meta[name="description"]').setAttribute('content', post.summary);

            const keywordsMeta = document.querySelector('meta[name="keywords"]');
            if (keywordsMeta) {
                keywordsMeta.setAttribute('content', post.tags.join(', '));
            }

            const authorMeta = document.querySelector('meta[name="author"]');
            if (authorMeta) {
                authorMeta.setAttribute('content', authorName);
            }
            // (Aquí podrías añadir más meta tags como og:title, etc.)

            // 3. Carga el contenido del archivo Markdown
            const contentResponse = await fetch(post.contentFile);
            const markdownContent = await contentResponse.text();

            // 4. Convierte el Markdown a HTML usando la librería 'marked'
            const postHTML = marked.parse(markdownContent);

            // 5. Construye el HTML final del componente
            const postUrl = `https://www.filogames.com/comunidad/${post.contentFile.replace('.md', '.html')}`;
            const imageUrl = post.imageUrl.startsWith('../') ? post.imageUrl : `../${post.imageUrl}`;

            this.innerHTML = `
                <article class="post-article">
                    <header class="post-header">
                        <div class="post-header-tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                        <h1>${post.title}</h1>
                        <div class="post-meta">
                            <span>Por ${authorName}</span> | 
                            <span>Publicado el ${new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</span>
                        </div>
                        <img class="post-main-image" src="${imageUrl}" alt="${post.title}">
                    </header>
                    
                    <div class="post-body">
                        ${postHTML} <!-- El contenido convertido se inserta aquí -->
                    </div>

                    <footer class="post-footer">
                        <!-- ... (botones de compartir) ... -->
                    </footer>
                </article>

                <section id="comments" class="container">
                    <h2>Comentarios de la Comunidad</h2>
                </section>
            `;
        } catch (error) {
            console.error("Error al cargar el contenido del post:", error);
        }
    }
}

customElements.define('mi-post-content', PostContent);
customElements.define('mi-comunidad-page', ComunidadPage);