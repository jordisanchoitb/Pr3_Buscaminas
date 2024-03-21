export function init() {
    let errorTelef = document.getElementById("errorTelef");

    // Sirve para que se vaya actualizando el error del telefono a medida que se cambia el valor
    document.getElementById("Telefono").addEventListener("input", function () {
        if (!(RegExp(/^[6-9][0-9]{2} [0-9]{3} [0-9]{3}|^[6-9][0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}/).test(document.getElementById("Telefono").value))) {
            errorTelef.textContent = "Introduzca un el telefono en el formato correcto (6|7|8|9)XX XXX XXX o (6|7|8|9)XX XX XX XX";
            errorTelef.className = "error active";
        } else {
            errorTelef.textContent = "";
            errorTelef.className = "error";
        }
    });
        
    document.getElementById("formconfing").addEventListener("submit", function (event) {
        event.preventDefault();
        // Evita que se envie el formulario si el telefono no esta en el formato correcto
        if (!(RegExp(/^[6-9][0-9]{2} [0-9]{3} [0-9]{3}|^[6-9][0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}/).test(document.getElementById("Telefono").value))) {
            return;
        }

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
