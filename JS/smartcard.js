document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.feature-card');
  
  cards.forEach((card, index) => {
    // Estado inicial antes de la animación
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    
    // Aparecen una tras otra con un desfase de 120ms
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 120);
  });
});

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
    const msg = `Hola Filo Games! Me interesa adquirir ${qty} Smart E-Cards. El presupuesto estimado es de ${total}. ¿Me dan siguientes pasos?`;
    window.open(`https://wa.me/51980664399?text=${encodeURIComponent(msg)}`);
}