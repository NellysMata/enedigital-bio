
    // Configuración de tu correo (para no repetir)
    const usuario = "nellysmata.dev";
    const dominio = "gmail.com";
    const emailCompleto = usuario + "@" + dominio;

    // 1. Función para el botón grande "COTIZAR"
    function enviarCotizacion(e) {
        e.preventDefault();
        // Asunto automático para que sepas que es un cliente
        const asunto = "🚀 Solicitud de Presupuesto Web";
        const cuerpo = "Hola EneDigital, vi tu perfil y me gustaría cotizar un proyecto...";
        
        // Abre el correo con todo relleno
        window.location.href = "mailto:" + emailCompleto + 
                               "?subject=" + encodeURIComponent(asunto) + 
                               "&body=" + encodeURIComponent(cuerpo);
    }

    // 2. Función para el icono pequeño del footer
    function abrirCorreo(e) {
        e.preventDefault();
        window.location.href = "mailto:" + emailCompleto;
    }
