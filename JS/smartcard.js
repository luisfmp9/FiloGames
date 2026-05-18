function updatePrice() {
    let input = document.getElementById('cardQuantity');
    let qty = parseInt(input.value);
    let unitPrice = 25; // Precio base
    let discount = 0;

    if (isNaN(qty) || qty < 1) {
        qty = 1;
    }
    if (qty >= 10 && qty < 50) discount = 0.10; // 10% desc
    else if (qty >= 50) discount = 0.25; // 25% desc por volumen masivo

    const finalUnitPrice = unitPrice * (1 - discount);
    const total = qty * finalUnitPrice;

    const discountTag = document.getElementById('discountTag');
    document.getElementById('unitPrice').innerText = `$${finalUnitPrice.toFixed(2)}`;
    document.getElementById('totalPrice').innerText = `$${total.toFixed(2)}`;
    discountTag.innerText = `${discount * 100}%`;

    // Feedback visual: Cambia el color si hay descuento
    if (discount > 0) {
        discountTag.style.color = "var(--neon-cyan)"; // Usando tu variable de connect.css
        discountTag.style.fontWeight = "bold";
    } else {
        discountTag.style.color = "white";
        discountTag.style.fontWeight = "normal";
    }
}

function sendToWpp() {
    const qty = document.getElementById('cardQuantity').value;
    const total = document.getElementById('totalPrice').innerText;
    const msg = `Hola Filo Games! Me interesa adquirir ${qty} Smart E-Cards. El presupuesto estimado es de ${total}. ¿Me dan los pasos para el diseño?`;
    window.open(`https://wa.me/51980664399?text=${encodeURIComponent(msg)}`);
}