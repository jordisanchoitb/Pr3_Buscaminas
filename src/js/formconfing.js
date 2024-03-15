export function init() {
    document.getElementById("formconfing").addEventListener("submit", function (event) {
        event.preventDefault();
        CreateCookie("Nombre", document.getElementById("Nombre").value);
        CreateCookie("Apellido", document.getElementById("Apellido").value);
        CreateCookie("Nick", document.getElementById("Nick").value);
        CreateCookie("Telefono", document.getElementById("Telefono").value);
        CreateCookie("Fechanacimiento", document.getElementById("Fechanacimiento").value);
        CreateCookie("Email", document.getElementById("Email").value);
        CreateCookie("Contrasenya", document.getElementById("Contrasenya").value);
        window.opener.postMessage(document.cookie, "*");
        window.close();
    });
}

function CreateCookie(name, value, days) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}
