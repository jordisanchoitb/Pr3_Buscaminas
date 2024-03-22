export function init() {
    let errorTelef = document.getElementById("errorTelef");
    let errorNick = document.getElementById("errorNick");
    let errorMail = document.getElementById("errorMail");
    let errorFechaNacimiento = document.getElementById("errorFechaNacimiento");

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
    // Sirve para que se vaya actualizando el error del nick a medida que se cambia el valor
    document.getElementById("Nick").addEventListener("input", function () {
        if (!(RegExp(/^[a-zA-Z]*[0-9]$/).test(document.getElementById("Nick").value))) {
            errorNick.textContent = "El nick solo puede contener letras i tiene que acabar por un número";
            errorNick.className = "error active";
        } else {
            errorNick.textContent = "";
            errorNick.className = "error";
        }
    });
    // Sirve para que se vaya actualizando el error del mail a medida que se cambia el valor
    document.getElementById("Email").addEventListener("input", function () {
        if (!(RegExp(/^[a-zA-Z0-9.]*@itb.cat$/).test(document.getElementById("Email").value))) {
            errorMail.textContent = "El mail debe acabar con @itb.cat";
            errorMail.className = "error active";
        } else {
            errorMail.textContent = "";
            errorMail.className = "error";
        }
    });
    // Sirve para que se vaya actualizando el error de la fecha de nacimiento a medida que se cambia el valor
    document.getElementById("Fechanacimiento").addEventListener("input", function () {
        if (calcularEdad(document.getElementById("Fechanacimiento").value) < 18) {
            errorFechaNacimiento.textContent = "Debes ser mayor de edad para jugar";
            errorFechaNacimiento.className = "error active";
        } else {
            errorFechaNacimiento.textContent = "";
            errorFechaNacimiento.className = "error";
        }
    });

    
    document.getElementById("formconfing").addEventListener("submit", function (event) {
        event.preventDefault();
        // Evita que se envie el formulario si el telefono no esta en el formato correcto
        if (!(RegExp(/^[6-9][0-9]{2} [0-9]{3} [0-9]{3}|^[6-9][0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}/).test(document.getElementById("Telefono").value))) {
            return;
        }
        // Evita que se envie el formulario si el nick no esta en el formato correcto
        if (!(RegExp(/.*[0-9]$/).test(document.getElementById("Nick").value))) {
            return;
        }
        // Evita que se envie el formulario si el mail no esta en el formato correcto
        if (!(RegExp(/.*@itb.cat$/).test(document.getElementById("Email").value))) {
            return;
        }
        // Evita que se envie el formulario si la fecha de nacimiento no es correcta
        if (calcularEdad(document.getElementById("Fechanacimiento").value) < 18) {
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

function calcularEdad(fechaNac) {
    let fechaActual = new Date();
    let fechaNacimiento = new Date(fechaNac);
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    let mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
}