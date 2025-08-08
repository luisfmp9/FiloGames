class ComunidadPage extends HTMLElement {
    constructor() {
        super();
        this.allPosts = [];
        this.allPeople = [];
        this.filteredPosts = [];
    }

    async connectedCallback() {
        try {
            const [postsResponse, peopleResponse] = await Promise.all([
                fetch('data/comunidad.json'),
                fetch('data/people.json')
            ]);
            this.allPosts = await postsResponse.json();
            this.allPeople = await peopleResponse.json();
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

        this.innerHTML = `
            <section class="container">
                <h2>Comunidad Filo Games</h2>
                <p class="section-subtitle">Nuestro espacio para compartir artículos, anuncios y reflexiones sobre tecnología, videojuegos y filosofía.</p>
                
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
                    <a href="posts/${post.contentFile}" class="post-card-image-link">
                        <img src="${post.imageUrl}" alt="${post.title}" loading="lazy">
                    </a>
                    <div class="post-card-content">
                        <div class="post-card-tags">
                            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <h3 class="post-card-title"><a href="posts/${post.contentFile}">${post.title}</a></h3>
                        <p class="post-card-summary">${post.summary}</p>
                        <div class="post-card-meta">
                            <span>Por ${author ? author.fullName : 'Anónimo'}</span>
                            <span>${new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
    }
}

// COMPONENTE PARA LA LISTA DE POSTS
class PostList extends HTMLElement {
    async connectedCallback() {
        const response = await fetch('data/comunidad.json');
        const posts = await response.json();
        
        let postsHTML = '';
        posts.forEach(post => {
            postsHTML += `
                <div class="post-card">
                    <a href="posts/${post.contentFile}" class="post-card-image-link">
                        <img src="${post.imageUrl}" alt="${post.title}" loading="lazy">
                    </a>
                    <div class="post-card-content">
                        <div class="post-card-tags">
                            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <h3 class="post-card-title"><a href="posts/${post.contentFile}">${post.title}</a></h3>
                        <p class="post-card-summary">${post.summary}</p>
                        <div class="post-card-meta">
                            <span>Por ${post.author}</span>
                            <span>${new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        this.innerHTML = `
            <div class="post-list-grid">${postsHTML}</div>
        `;
    }
}

// COMPONENTE PARA EL CONTENIDO DE UN POST INDIVIDUAL
class PostContent extends HTMLElement {
    async connectedCallback() {
        const postId = this.getAttribute('post-id');
        if (!postId) return;

        const response = await fetch('../data/comunidad.json');
        const posts = await response.json();
        const post = posts.find(p => p.id === postId);

        if (!post) return;

        const postUrl = `https://www.filogames.com/comunidad/${post.contentFile}`;

        this.innerHTML = `
            <article class="post-article">
                <header class="post-header">
                    <h1>${post.title}</h1>
                    <div class="post-meta">
                        <span>Por ${post.author}</span> | 
                        <span>Publicado el ${new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <img class="post-main-image" src="${post.imageUrl}" alt="${post.title}">
                </header>
                
                <div class="post-body">
                    <slot></slot>
                </div>

                <footer class="post-footer">
                    <div class="share-buttons">
                        <span>Compartir:</span>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${postUrl}" target="_blank">Facebook</a>
                        <a href="https://twitter.com/intent/tweet?url=${postUrl}&text=${encodeURIComponent(post.title)}" target="_blank">Twitter</a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}" target="_blank">LinkedIn</a>
                        <a href="https://wa.me/?text=${encodeURIComponent(post.title + ' ' + postUrl)}" target="_blank">WhatsApp</a>
                    </div>
                </footer>
            </article>

            <section id="comments" class="container">
                <h2>Comentarios</h2>
                </section>
        `;
    }
}

customElements.define('mi-post-list', PostList);
customElements.define('mi-post-content', PostContent);
customElements.define('mi-comunidad-page', ComunidadPage);