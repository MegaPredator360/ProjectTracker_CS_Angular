// Para redirigir basado en un click
function redirectSectionPage(elementoId, height) {
    var top = document.getElementById(elementoId).offsetTop - document.getElementById("navbar").offsetHeight - height;
    window.scrollTo({
        top: top,
        behavior: "smooth"
    });
}

// Modo Oscuro
function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("darkMode");
}