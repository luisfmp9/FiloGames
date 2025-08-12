El lanzamiento de nuestro nuevo sitio web, https://www.filogames.com/, ha sido una maratón de aprendizaje. Esta no es la primera versión; la idea nació del CSS que creé para la página de nuestro juego "Chuter" en itch.io. Hace unas semanas, decidí llevarlo a un nivel profesional, y quiero compartir las lecciones técnicas del proceso.

La decisión de usar **HTML, CSS y JS nativo con Web Components** se debió en gran parte a la inercia de mis proyectos anteriores. Sin embargo, este camino, en conjunto con el acompañamiento de la IA Gemini Pro, me forzó a profundizar en los fundamentos de una manera que un framework a veces oculta.

### **Mis Mayores Aprendizajes:**

#### **Optimización "Core Web Vitals"**

Me obsesioné con el rendimiento, usando herramientas como PageSpeed Insights. Aprendí a solucionar problemas reales:

* **CLS (Cumulative Layout Shift):** Eliminé los "saltos" visuales auto-alojando las fuentes y usando font-display: swap.  
* **LCP (Largest Contentful Paint):** Implementé loading="lazy" en las imágenes "below the fold" y moví todos los scripts al final del \<body\> con defer.  
* **Optimización de Imágenes:** Profundicé en el uso de formatos como **WebP** para fotos y **SVG** para logos, utilizando herramientas como Inkscape y SVGOMG para mantener los tamaños de archivo al mínimo.

#### **Arquitectura de Servidor**

Conectar un dominio de Namecheap a GitHub Pages a través de **Cloudflare** fue una lelección magistral sobre infraestructura. Aprendí a configurar registros DNS, reglas de redirección para forzar HTTPS y www, y a solucionar errores de SSL (como el 522 y 526).

Curiosamente, este proceso me hizo valorar aún más la utilidad de herramientas como **React o Vue** para proyectos serios y escalables. En el futuro, es posible que migremos a un framework y exploremos el uso de **Sass** para organizar el CSS.