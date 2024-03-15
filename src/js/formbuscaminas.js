export function init() {
    let buttonPrincipiante = document.getElementById("principiante");
    let buttonIntermedio = document.getElementById("intermedio");
    let buttonExperto = document.getElementById("experto");
    buttonPrincipiante.addEventListener("click", () => preset(1));
    buttonIntermedio.addEventListener("click", () => preset(2));
    buttonExperto.addEventListener("click", () => preset(3));

    document.getElementById("formbuscaminas").addEventListener("submit", function (event) {
        event.preventDefault();
        CreateCookie("Filas", document.getElementById("Filas").value);
        CreateCookie("Columnas", document.getElementById("Columnas").value);
        CreateCookie("Minas", document.getElementById("Minas").value);
        window.opener.postMessage(document.cookie, "*");
        window.close();
    });
}

function preset(pres) {
    let filas = document.getElementById("Filas");
    let columnas = document.getElementById("Columnas");
    let minas = document.getElementById("Minas");
    switch (pres) {
        case 1:
            filas.value = 8;
            columnas.value = 10;
            minas.value = 10;
            break;
        case 2:
            filas.value = 14;
            columnas.value = 18;
            minas.value = 40;
            break;
        case 3:
            filas.value = 24;
            columnas.value = 20;
            minas.value = 99;
            break;
    }
}

function CreateCookie(name, value, days) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}