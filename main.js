/* --- MAIN JAVASCRIPT --- */

// --- GLOBAL FUNCTIONS (Called via HTML onclick) ---

/* --- SHARE LOGIC --- */
function sharePage(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("¡Mira esta web para digitalizar tu negocio en Vitoria! 🚀");
    const linkedinUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + url;

    if (platform === 'whatsapp') {
        window.open("https://wa.me/?text=" + text + "%20" + url, '_blank');
    } else if (platform === 'linkedin') {
        window.open(linkedinUrl, '_blank');
    } else if (platform === 'copy') {
        navigator.clipboard.writeText(window.location.href);
        alert("¡Enlace copiado al portapapeles!");
    }
}

function closeBot() {
    const bot = document.getElementById('whatsapp-bot');
    if (bot) bot.classList.remove('show');
}

/* --- ACCORDION LOGIC --- */
function toggleClinicFisioDetails() {
    const details = document.getElementById('clinicfisio-details');
    const button = document.getElementById('toggle-clinicfisio');

    if (details.classList.contains('show')) {
        // Cerrar
        details.classList.remove('show');
        details.style.maxHeight = '0';
        button.textContent = 'VER MÁS DETALLES →';
    } else {
        // Abrir
        details.classList.add('show');
        details.style.maxHeight = details.scrollHeight + 'px';
        button.textContent = 'VER MENOS ↑';
    }
}

function toggleEdimarDetails() {
    const details = document.getElementById('edimar-details');
    const button = document.getElementById('toggle-edimar');

    if (details.classList.contains('show')) {
        // Cerrar
        details.classList.remove('show');
        details.style.maxHeight = '0';
        button.textContent = 'VER MÁS DETALLES →';
    } else {
        // Abrir
        details.classList.add('show');
        details.style.maxHeight = details.scrollHeight + 'px';
        button.textContent = 'VER MENOS ↑';
    }
}

/* --- TYPEFORM MODAL (Lazy Load) --- */
function openTypeformModal() {
    // Cargar script on-demand si no existe
    if (!document.getElementById('typeform-script')) {
        const script = document.createElement('script');
        script.id = 'typeform-script';
        script.src = 'https://embed.typeform.com/next/embed.js';
        document.body.appendChild(script);
    }

    const modal = document.getElementById('typeform-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeTypeformModal() {
    const modal = document.getElementById('typeform-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

/* --- PREVIEW MODAL --- */
function openPreviewModal(title, subtitle, url) {
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('preview-iframe');
    const titleEl = document.getElementById('preview-title');
    const subtitleEl = document.getElementById('preview-subtitle');
    const externalLink = document.getElementById('preview-external-link');

    if (modal && iframe && titleEl && subtitleEl && externalLink) {
        titleEl.textContent = title;
        subtitleEl.textContent = subtitle;
        iframe.src = url;
        externalLink.href = url;

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closePreviewModal() {
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('preview-iframe');

    if (modal && iframe) {
        iframe.src = ''; // Clean iframe
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

/* --- TECHNICAL REPORT MODAL --- */
function openTechModal(id) {
    const modal = document.getElementById('tech-modal-' + id);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeTechModal(id) {
    const modal = document.getElementById('tech-modal-' + id);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}


// --- INITIALIZATION (DOMContentLoaded) ---
document.addEventListener('DOMContentLoaded', () => {

    /* --- WHATSAPP BOT DELAY --- */
    setTimeout(() => {
        const botBubble = document.getElementById('whatsapp-bot');
        if (botBubble) botBubble.classList.add('show');
    }, 4000);

    /* --- TESTIMONIALS CAROUSEL --- */
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        const testimonials = track.querySelectorAll('.testimonial-card');
        const totalTestimonials = testimonials.length;
        let currentIndex = 0;
        let autoPlayInterval;

        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalTestimonials; i++) {
                const dot = document.createElement('button');
                dot.className = 'testimonial-dot';
                dot.setAttribute('aria-label', `Ir al testimonio ${i + 1}`);
                dot.onclick = () => goToSlide(i);
                dotsContainer.appendChild(dot);
            }
            updateDots();
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            const offset = -currentIndex * 100;
            track.style.transform = `translateX(${offset}%)`;
            updateDots();
            resetAutoPlay();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            goToSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
            goToSlide(currentIndex);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('mouseleave', startAutoPlay);

        // Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                nextSlide();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                prevSlide();
            }
        }

        // Initialize
        createDots();
        startAutoPlay();
    }

    /* --- GLOBAL MODAL LISTENERS (Click Outside / ESC) --- */
    document.addEventListener('click', function (event) {
        const typeformModal = document.getElementById('typeform-modal');
        const previewModal = document.getElementById('preview-modal');

        if (event.target === typeformModal) closeTypeformModal();
        if (event.target === previewModal) closePreviewModal();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            const typeformModal = document.getElementById('typeform-modal');
            const previewModal = document.getElementById('preview-modal');

            if (typeformModal && typeformModal.classList.contains('show')) closeTypeformModal();
            if (previewModal && previewModal.classList.contains('show')) closePreviewModal();
        }
    });

    /* --- GTM DELAYED LOAD (WPO) --- */
    (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;

        function loadGTM() {
            if (window.gtmLoaded) return;
            window.gtmLoaded = true;
            f.parentNode.insertBefore(j, f);
            console.log('GTM Loaded (Delayed)');
        }

        setTimeout(loadGTM, 5000); // 5s Delay
        window.addEventListener('scroll', loadGTM, { once: true });
        window.addEventListener('click', loadGTM, { once: true });
        window.addEventListener('mousemove', loadGTM, { once: true });
    })(window, document, 'script', 'dataLayer', 'GTM-KH3FC94Z');

});

/* --- DARK MODE TOGGLE --- */
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        // Check saved preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            const icon = toggle.querySelector('span');
            if(icon) icon.textContent = '☀️';
        }

        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            const icon = toggle.querySelector('span');
            if(icon) icon.textContent = isDark ? '☀️' : '🌙';
        });
    }
});
