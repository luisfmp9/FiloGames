let BASE_CARD_PRICE = 59; 
const LANDING_PAGE_PRICE = 2500; 

document.addEventListener("DOMContentLoaded", () => {
    cargarPrecioDesdeJSON();
    syncCalculator(); 
    
    // Animación de aparición de las feature-cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 120);
    });
});

async function cargarPrecioDesdeJSON() {
    try {
        const response = await fetch('../data/services.json'); 
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const servicios = await response.json();
        const servicioNFC = servicios.find(servicio => servicio.id === "nfc-basico");
        
        if (servicioNFC) {
            BASE_CARD_PRICE = servicioNFC.price;
            console.log(`✅ Precio base actualizado desde JSON: S/ ${BASE_CARD_PRICE}`);
            syncCalculator(); 
        }
    } catch (error) {
        console.error("❌ Usando precio de respaldo:", error);
    }
}

// --- FUNCIONES DE MAPEO PARA EL SLIDER SEGMENTADO ---
// Convierte la posición del slider (0 a 300) en cantidad real (1 a 10000)
function posToQty(pos) {
    if (pos <= 100) {
        return Math.round(1 + (pos / 100) * 99); // Tramo 1: 1 a 100
    } else if (pos <= 200) {
        return Math.round(100 + ((pos - 100) / 100) * 900); // Tramo 2: 100 a 1000
    } else {
        return Math.round(1000 + ((pos - 200) / 100) * 9000); // Tramo 3: 1000 a 10000
    }
}

// Convierte la cantidad real (1 a 10000) en la posición del slider (0 a 300)
function qtyToPos(qty) {
    if (qty <= 1) return 0;
    if (qty <= 100) {
        return ((qty - 1) / 99) * 100;
    } else if (qty <= 1000) {
        return 100 + ((qty - 100) / 900) * 100;
    } else {
        if (qty > 10000) qty = 10000;
        return 200 + ((qty - 1000) / 9000) * 100;
    }
}

// Manejadores de eventos del cotizador
function handleSliderMove(sliderValue) {
    let qty = posToQty(parseInt(sliderValue));
    document.getElementById('cardQuantity').value = qty;
    syncCalculator();
}

function handleInputQuantity(inputValue) {
    let qty = parseInt(inputValue) || 1;
    if (qty > 10000) qty = 10000;
    if (qty < 1) qty = 1;
    document.getElementById('cardQuantity').value = qty;
    document.getElementById('cardSlider').value = qtyToPos(qty);
    syncCalculator();
}

function adjustQty(change) {
    let input = document.getElementById('cardQuantity');
    let currentQty = parseInt(input.value) || 1;
    let newQty = currentQty + change;
    if (newQty < 1) newQty = 1;
    if (newQty > 10000) newQty = 10000;
    
    input.value = newQty;
    document.getElementById('cardSlider').value = qtyToPos(newQty);
    syncCalculator();
}

function syncCalculator() {
    let qtyInput = document.getElementById('cardQuantity');
    if (!qtyInput) return;
    
    let qty = parseInt(qtyInput.value) || 1;
    let discount = 0;

    // Lógica de descuentos por volumen
    if (qty >= 10 && qty < 50) discount = 0.10;
    else if (qty >= 50) discount = 0.25;

    // Cálculos unitarios y subtotales
    let finalUnitPrice = BASE_CARD_PRICE * (1 - discount);
    let normalSubtotal = qty * BASE_CARD_PRICE;
    let finalSubtotal = qty * finalUnitPrice;

    // RESALTADO DE DESCUENTO CON TACHADO
    if (discount > 0) {
        // Tachamos precio unitario original e iluminamos el nuevo en neón cian
        document.getElementById('unitPriceLabel').innerHTML = 
            `<span style="text-decoration: line-through; color: #555; margin-right: 8px;">S/ ${BASE_CARD_PRICE.toFixed(2)}</span>` +
            `<span style="color: var(--neon-cyan); font-weight: bold;">S/ ${finalUnitPrice.toFixed(2)}</span>`;
        
        // Tachamos subtotal original
        document.getElementById('cardsSubtotal').innerHTML = 
            `<span style="text-decoration: line-through; color: #555; margin-right: 8px;">S/ ${normalSubtotal.toFixed(2)}</span>` +
            `<span style="color: var(--neon-cyan); font-weight: bold;">S/ ${finalSubtotal.toFixed(2)}</span>`;
    } else {
        document.getElementById('unitPriceLabel').innerText = `S/ ${BASE_CARD_PRICE.toFixed(2)}`;
        document.getElementById('cardsSubtotal').innerText = `S/ ${normalSubtotal.toFixed(2)}`;
    }

    // Cálculos de Diseño (Gratis desde 50 unidades)
    let designSelect = document.getElementById('designTier');
    let rawDesignCost = parseFloat(designSelect.value);
    let finalDesignCost = (qty >= 50) ? 0 : rawDesignCost;

    if (qty >= 50) {
        designSelect.style.borderColor = "var(--neon-cyan)";
        document.getElementById('designCostLabel').innerHTML = 
            `<span style="text-decoration: line-through; color: #555; margin-right: 8px;">S/ ${rawDesignCost.toFixed(2)}</span>` +
            `<span style="color: var(--neon-cyan); font-weight: bold;">¡GRATIS!</span>`;
    } else {
        designSelect.style.borderColor = "#444";
        document.getElementById('designCostLabel').innerText = `S/ ${finalDesignCost.toFixed(2)}`;
    }

    // Costo de Landing Page
    let isLandingChecked = document.getElementById('addLandingPage').checked;
    let extrasCost = isLandingChecked ? LANDING_PAGE_PRICE : 0;
    document.getElementById('extrasCostLabel').innerText = `S/ ${extrasCost.toFixed(2)}`;

    // Inversión Total
    let total = finalSubtotal + finalDesignCost + extrasCost;
    document.getElementById('totalPrice').innerText = `S/ ${total.toFixed(2)}`;
    
    // Tag de porcentaje de descuento
    let discountTag = document.getElementById('discountTag');
    discountTag.innerText = `${(discount * 100)}%`;
    discountTag.style.color = discount > 0 ? "var(--neon-cyan)" : "white";
    discountTag.style.fontWeight = discount > 0 ? "bold" : "normal";
}

function sendToWpp() {
    let qty = document.getElementById('cardQuantity').value;
    let total = document.getElementById('totalPrice').innerText;
    let designLevel = document.getElementById('designTier').options[document.getElementById('designTier').selectedIndex].text;
    let wantsLanding = document.getElementById('addLandingPage').checked ? "Sí" : "No";
    
    let msg = `¡Hola Filo Games! 🚀 Me interesa cotizar:\n\n` +
              `- ${qty} Smart E-Cards\n` +
              `- Nivel de Diseño: ${designLevel}\n` +
              `- Landing Page Corporativa: ${wantsLanding}\n\n` +
              `Inversión total estimada: ${total}\n\n¿Me ayudan con los detalles para iniciar el pedido?`;
              
    window.open(`https://wa.me/51980664399?text=${encodeURIComponent(msg)}`);
}