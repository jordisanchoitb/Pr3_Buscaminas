export function init() {
    let buttonPrincipiante = document.getElementById("principiante");
    let buttonIntermedio = document.getElementById("intermedio");
    let buttonExperto = document.getElementById("experto");
    let errorMinas = document.getElementById("errorMinas");
    buttonPrincipiante.addEventListener("click", () => preset(1));
    buttonIntermedio.addEventListener("click", () => preset(2));
    buttonExperto.addEventListener("click", () => preset(3));

    // Sirve para que se vaya actualizando el error de minas a medida que se cambian los valores de filas, columnas y minas
    document.getElementById("Minas").addEventListener("input", function () {
        let filas = document.getElementById("Filas").value;
        let columnas = document.getElementById("Columnas").value;
        let minas = document.getElementById("Minas").value;
        if (filas * columnas <= minas) {
            errorMinas.textContent = "El número de minas no puede igual o mayor que el número de celdas";
            errorMinas.className = "error active";
        } else {
            errorMinas.textContent = "";
            errorMinas.className = "error";
        }
    });

    document.getElementById("Filas").addEventListener("input", function () {
        let filas = document.getElementById("Filas").value;
        let columnas = document.getElementById("Columnas").value;
        let minas = document.getElementById("Minas").value;
        if (filas * columnas <= minas) {
            errorMinas.textContent = "El número de minas no puede igual o mayor que el número de celdas";
            errorMinas.className = "error active";
        } else {
            errorMinas.textContent = "";
            errorMinas.className = "error";
        }
    });

    document.getElementById("Columnas").addEventListener("input", function () {
        let filas = document.getElementById("Filas").value;
        let columnas = document.getElementById("Columnas").value;
        let minas = document.getElementById("Minas").value;
        if (filas * columnas <= minas) {
            errorMinas.textContent = "El número de minas no puede igual o mayor que el número de celdas";
            errorMinas.className = "error active";
        } else {
            errorMinas.textContent = "";
            errorMinas.className = "error";
        }
    });

    document.getElementById("formbuscaminas").addEventListener("submit", function (event) {
        event.preventDefault();
        let filas = document.getElementById("Filas").value;
        let columnas = document.getElementById("Columnas").value;
        let minas = document.getElementById("Minas").value;
        
        // Validacion para que el numero de minas no sea mayor o igual que el numero de celdas
        // i que en caso de que este mal no se envie el formulario
        if (filas * columnas <= minas) {
            return;
        }
        
        CreateCookie("Filas", filas);
        CreateCookie("Columnas", columnas);
        CreateCookie("Minas", minas);
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