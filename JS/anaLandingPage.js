document.getElementById('google-sheet-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('form-status');
    const btn = form.querySelector('button');

    btn.disabled = true;
    btn.innerText = "Sincronizando...";
    status.innerText = "Enviando a la base de datos...";
    status.style.color = "var(--neon-cyan)";

    // Esta URL la obtienes al publicar tu Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxuYzg0-_CB9aYFXiFs4VpT_YTYtkJXFJV2xOZOVvari7urp-P4jTAfGEUoWm85HGCn/exec';

    // Usamos URLSearchParams para asegurar la compatibilidad con Apps Script
    fetch(scriptURL, { 
        method: 'POST', 
        mode: 'no-cors', // Añadimos esto para evitar bloqueos de seguridad del navegador
        body: new URLSearchParams(new FormData(form))
    })
    .then(() => {
        // Con 'no-cors' no podemos leer la respuesta, pero si llega aquí es que se envió
        status.innerText = "¡Registro completado! Bienvenido a la colonia.";
        btn.innerText = "¡Listo!";
        form.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        status.innerText = "Error en la conexión. Intenta de nuevo.";
        status.style.color = "var(--neon-magenta)";
        btn.disabled = false;
        btn.innerText = "Reintentar";
    });
});