
// --- 1. Lógica del Modo Oscuro ---
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️'; 
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        toggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        toggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// --- 2. Lógica del Botón COMPARTIR (NUEVO) ---
const shareBtn = document.getElementById('share-btn');

shareBtn.addEventListener('click', async () => {
    // Intenta compartir nativamente (Móvil)
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'EneDigital | Diseño Web',
                text: 'Mira esta diseñadora web ⚡',
                url: window.location.href
            });
        } catch (err) {
            console.log('Error al compartir', err);
        }
    } else {
        // Si no se puede compartir, copia al portapapeles (PC)
        try {
            await navigator.clipboard.writeText(window.location.href);
            // Cambia el icono temporalmente para avisar
            const originalText = shareBtn.textContent;
            shareBtn.textContent = '✅';
            setTimeout(() => {
                shareBtn.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Error al copiar', err);
        }
    }
});

// --- 3. Tu Script Original para el Correo ---
function enviarCotizacion(e) {
    e.preventDefault();
    const subject = "Cotización de Proyecto Web - EneDigital";
    const body = "Hola EneDigital, me gustaría cotizar un proyecto. Mi idea es...";
    window.location.href = `mailto:enedigitalweb@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function abrirCorreo(e) {
    e.preventDefault();
    window.location.href = "mailto:enedigitalweb@gmail.com";
}
