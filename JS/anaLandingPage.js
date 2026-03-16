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

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            status.innerText = "¡Registro completado! Bienvenido a la colonia.";
            btn.innerText = "¡Listo!";
            form.reset();
        })
        .catch(error => {
            status.innerText = "Error en la conexión. Intenta de nuevo.";
            status.style.color = "var(--neon-magenta)";
            btn.disabled = false;
            btn.innerText = "Reintentar";
        });
});