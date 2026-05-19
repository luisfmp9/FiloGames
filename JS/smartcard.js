// Precios Base (Idealmente, en un futuro, cargar esto desde services.json con fetch)
const BASE_CARD_PRICE = 59; 
const LANDING_PAGE_PRICE = 2500;

document.addEventListener("DOMContentLoaded", () => {
    syncCalculator();
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

function adjustQty(change) {
    let input = document.getElementById('cardQuantity');
    let newVal = parseInt(input.value || 0) + change;
    if (newVal < 1) newVal = 1;
    syncCalculator(newVal);
}

function syncCalculator(val = null) {
    let input = document.getElementById('cardQuantity');
    let slider = document.getElementById('cardSlider');
    
    // Sincronizar input y slider
    if (val !== null) {
        input.value = val;
        slider.value = val;
    } else {
        slider.value = input.value;
    }
    
    let qty = parseInt(input.value) || 1;
    let discount = 0;

    // Lógica de Descuentos por volumen
    if (qty >= 10 && qty < 50) discount = 0.10;
    else if (qty >= 50) discount = 0.25;

    // Cálculos de Tarjetas
    let cardsSubtotal = qty * BASE_CARD_PRICE;
    let cardsDiscounted = cardsSubtotal * (1 - discount);

    // Cálculos de Diseño (Gratis si compran 50 o más)
    let designSelect = document.getElementById('designTier');
    let rawDesignCost = parseFloat(designSelect.value);
    let finalDesignCost = (qty >= 50) ? 0 : rawDesignCost;

    // Actualizar UI del Select para mostrar que es gratis
    if (qty >= 50) {
        designSelect.style.borderColor = "var(--neon-cyan)";
        document.getElementById('designCostLabel').innerHTML = `<span style="text-decoration: line-through; color: #666;">S/ ${rawDesignCost.toFixed(2)}</span> <span style="color: var(--neon-cyan);">¡GRATIS!</span>`;
    } else {
        designSelect.style.borderColor = "#444";
        document.getElementById('designCostLabel').innerText = `S/ ${finalDesignCost.toFixed(2)}`;
    }

    // Cálculos de Landing Page
    let isLandingChecked = document.getElementById('addLandingPage').checked;
    let extrasCost = isLandingChecked ? LANDING_PAGE_PRICE : 0;

    // Totales
    let total = cardsDiscounted + finalDesignCost + extrasCost;

    // Renderizar en UI
    document.getElementById('cardsSubtotal').innerText = `S/ ${cardsSubtotal.toFixed(2)}`;
    document.getElementById('extrasCostLabel').innerText = `S/ ${extrasCost.toFixed(2)}`;
    document.getElementById('totalPrice').innerText = `S/ ${total.toFixed(2)}`;
    
    let discountTag = document.getElementById('discountTag');
    discountTag.innerText = `${(discount * 100)}%`;
    discountTag.style.color = discount > 0 ? "var(--neon-cyan)" : "white";
}

function sendToWpp() {
    let qty = document.getElementById('cardQuantity').value;
    let total = document.getElementById('totalPrice').innerText;
    let designLevel = document.getElementById('designTier').options[document.getElementById('designTier').selectedIndex].text;
    let wantsLanding = document.getElementById('addLandingPage').checked ? "Sí" : "No";
    
    let msg = `¡Hola Filo Games! 🚀 Me interesa cotizar:\n\n` +
              `- ${qty} Smart E-Cards\n` +
              `- Nivel de Diseño: ${designLevel}\n` +
              `- Landing Page: ${wantsLanding}\n\n` +
              `Total estimado: ${total}\n\n¿Podemos coordinar los detalles?`;
              
    window.open(`https://wa.me/51980664399?text=${encodeURIComponent(msg)}`);
}