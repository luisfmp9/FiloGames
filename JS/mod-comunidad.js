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

// COMPONENTE PARA EL CONTENIDO DE UN POST INDIVIDUAL (VERSIÓN MEJORADA)
class PostContent extends HTMLElement {
    async connectedCallback() {
        const postId = this.getAttribute('post-id');
        if (!postId) return;

        try {
            // 1. Carga los datos de todos los posts y personas
            const [postsResponse, peopleResponse] = await Promise.all([
                fetch('../data/comunidad.json'),
                fetch('../data/people.json')
            ]);
            const posts = await postsResponse.json();
            const people = await peopleResponse.json();
            
            const post = posts.find(p => p.id === postId);
            if (!post) { this.innerHTML = `<p>Post no encontrado.</p>`; return; }

            // 2. Actualiza dinámicamente el <head> de la página
            document.title = `${post.title} - Filo Games`;
            document.querySelector('meta[name="description"]').setAttribute('content', post.summary);
            // (Aquí podrías añadir más meta tags como og:title, etc.)

            // 3. Carga el contenido del archivo Markdown
            const contentResponse = await fetch(post.contentFile);
            const markdownContent = await contentResponse.text();

            // 4. Convierte el Markdown a HTML usando la librería 'marked'
            const postHTML = marked.parse(markdownContent);

            // 5. Construye el HTML final del componente
            const author = people.find(p => p.id === post.authorId);
            const authorName = author ? author.fullName : 'Anónimo';
            const postUrl = `https://www.filogames.com/comunidad/${post.contentFile.replace('.md', '.html')}`;
            const imageUrl = post.imageUrl.startsWith('../') ? post.imageUrl : `../${post.imageUrl}`;

            this.innerHTML = `
                <article class="post-article">
                    <header class="post-header">
                        <div class="post-header-tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                        <h1>${post.title}</h1>
                        <div class="post-meta">
                            <span>Por ${authorName}</span> | 
                            <span>Publicado el ${new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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

customElements.define('mi-post-list', PostList);
customElements.define('mi-post-content', PostContent);
customElements.define('mi-comunidad-page', ComunidadPage);