document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Fondo paralaje
    let scrollPosition = window.scrollY;
    document.body.style.backgroundPositionY = (scrollPosition * 0.2) + "px";

    window.addEventListener("scroll", function () {
        scrollPosition = window.scrollY;
        requestAnimationFrame(() => {
            document.body.style.backgroundPositionY = (scrollPosition * 0.2) + "px";
        });
    });

    // 🔹 Variables globales
    const navbarHeight = document.querySelector("header").offsetHeight;
    const header = document.querySelector("header");
    const links = document.querySelectorAll(".nav-links a");
    const menuIcon = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    const mediaVuelta = document.getElementById("media-vuelta");
    const conversemos = document.getElementById("conversemos");
    const nuestroMundo = document.getElementById("nuestro-mundo");
    const loQueNosGusta = document.getElementById("lo-que-nos-gusta");


    // 🔹 Menú hamburguesa toggle
    menuIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        navLinks.classList.toggle("open");
        menuIcon.classList.toggle("open");
        header.classList.toggle("open");
    });

    // 🔹 Cerrar menú al hacer clic fuera
    document.addEventListener("click", function (event) {
        if (!navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
            navLinks.classList.remove("open");
            menuIcon.classList.remove("open");
            header.classList.remove("open");
        }
    });

    // 🔹 Scroll automático con ajustes por sección
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                let adjustment = navbarHeight / 2;

                if (targetId === "lo-que-nos-gusta") {
                    adjustment = navbarHeight * 0.8;
                }

                if (targetId === "conversemos") {
                    adjustment = navbarHeight * 0;
                }

                if (targetId === "nuestro-mundo") {
                    adjustment = navbarHeight * 1;
                }

                if (window.matchMedia("(max-width: 480px)").matches) {
                    adjustment = navbarHeight * 0.6;

                    if (targetId === "lo-que-nos-gusta") {
                        adjustment = navbarHeight * 0.2;
                    }

                    if (targetId === "conversemos") {
                        adjustment = navbarHeight * 0.1;
                    }
                }

                const targetPosition = targetSection.offsetTop - adjustment;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                navLinks.classList.remove("open");
                menuIcon.classList.remove("open");
                header.classList.remove("open");
            }
        });
    });

    function handleOrientationChange() {
        const warning = document.getElementById("landscape-warning");
        const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    
        // Detecta si el dispositivo es móvil o tablet (por su ancho, no por orientación)
        const isMobileDevice = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
        
        if (isLandscape && isMobileDevice) {
            warning.style.display = "flex";
            document.body.classList.add("no-scroll");
        } else {
            warning.style.display = "none";
            document.body.classList.remove("no-scroll");
        }
    }
      
      window.addEventListener("resize", handleOrientationChange);
      window.addEventListener("orientationchange", handleOrientationChange);
      handleOrientationChange(); // Llama a la función al cargar la página para verificar el estado inicial
      
});


