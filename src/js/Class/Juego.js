import { Tablero } from "./Tablero.js";
import { Jugador } from "./Jugador.js";

let tablero;
let jugador;

export function initJuego() {
    // Inabilitar el click derecho menu
    document.oncontextmenu = function () { return false; }

    // Boton para abrir la ventana de configuracion del jugador
    let botonperfil = document.getElementById("perfil");
    botonperfil.addEventListener("click", function () {
        window.open("./src/html/formConfing.html", "Configuracion", "width=400, height=400");
    });
    // Boton para abrir la ventana de configuracion del tablero
    let botonconftablero = document.getElementById("conftablero");
    botonconftablero.addEventListener("click", function () {
        window.open("./src/html/formbuscaminas.html", "Configuracion Tablero", "width=400, height=400");
    });

    // Boton para reiniciar el juego
    let botonrefresh = document.getElementById("reiniciar");
    botonrefresh.addEventListener("click", function () {
        location.reload();
    });    

    //open("./formConfing.html", "Configuracion", "width=400, height=400")
    
    tablero = new Tablero(5, 5, 5);
    jugador = new Jugador("Pepe", "Perez", "pepeperez", 789987789, "1999-12-12", "1234");
    console.log(jugador.toString());

    console.log(tablero.matrizCeldas);
    console.log("TableroMinas")
    PrintarTableroMinasConsole(tablero);
    console.log("TableroNumeros")
    PrintarNumeroMinas(tablero);
    CrearTableroDom(tablero);
}

function PrintarTableroMinasConsole(tablero) {
    let matriz = [];
    for (let i = 0; i < tablero.filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < tablero.columnas; j++) {
            if (tablero.matrizCeldas[i][j].mina) {
                matriz[i][j] = "Mina";
                // matriz[i][j] = "X";
            } else {
                matriz[i][j] = "NoMina";
                // matriz[i][j] = tablero.celdas[i][j].minasAlrededor;
            }
        }
    }
    console.log(matriz);
}

function PrintarNumeroMinas(tablero) {
    let matriz = [];
    for (let i = 0; i < tablero.filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < tablero.columnas; j++) {
            if (tablero.matrizCeldas[i][j].mina) {
                matriz[i][j] = "Mina";
            } else {
                matriz[i][j] = tablero.matrizCeldas[i][j].minasAlrededor;
            }
        }
    }
    console.log(matriz);
}

function PrintarZeldasAbiertas(tablero) {
    let matriz = [];
    for (let i = 0; i < tablero.filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < tablero.columnas; j++) {
            if (tablero.matrizCeldas[i][j].abierta) {
                matriz[i][j] = "Abierta";
            } else {
                matriz[i][j] = "Cerrada";
            }
        }
    }
    console.log(matriz);
}

function CrearTableroDom(tablero) {
    let tableroDom = document.getElementById("tablero");
    let tabla = document.createElement("table");
    for (let i = 0; i < tablero.filas; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < tablero.columnas; j++) {
            let celda = document.createElement("td");
            celda.setAttribute("fila", i);
            celda.setAttribute("columna", j);
            celda.addEventListener("click", function () {
                AbrirCelda(i, j, tablero);
                console.log(`Click celda ${i} ${j}`);
            });
            celda.addEventListener("contextmenu", function () {
                ColocarBandera(i, j, tablero);
                console.log(`Click celda ${i} ${j}, colocar bandera`);
            });
            celda.className = "tablacelda";
            celda.style.backgroundColor = "grey";
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    tableroDom.appendChild(tabla);
}

function ActualizarBanderas(tablero) {
    let tabla = document.querySelector("table");
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            let celda = tabla.querySelector(`[fila="${i}"][columna="${j}"]`);
            if (tablero.matrizCeldas[i][j].bandera && !tablero.matrizCeldas[i][j].abierta) {
                celda.innerHTML = "B";
            } else if (celda.innerHTML == "B") {
                celda.innerHTML = "";
            }
        }
    }
}

function ActualizarAbiertas(tablero) {
    let tabla = document.querySelector("table");
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            let celda = tabla.querySelector(`[fila="${i}"][columna="${j}"]`);
            if (tablero.matrizCeldas[i][j].abierta) {
                celda.style.backgroundColor = "white";
                if (tablero.matrizCeldas[i][j].mina) {
                    celda.style.backgroundColor = "red";
                    celda.innerHTML = "M";
                    tablero.notplay = true;
                    document.getElementById("hasperdido").style.display = "block";
                    //document.body.innerHTML += "Has perdido";
                    
                } else {
                    if (tablero.matrizCeldas[i][j].minasAlrededor != 0) {
                        celda.innerHTML = tablero.matrizCeldas[i][j].minasAlrededor;
                    }
                }
            }
        }
    }
}

function ComprobarVictoria(tablero) {
    let contadorabiertas = 0;
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            if (tablero.matrizCeldas[i][j].abierta) {
                contadorabiertas++;
            }
        }
    }

    if (contadorabiertas === tablero.filas * tablero.columnas - tablero.minas) {
        tablero.notplay = true;
        document.getElementById("hasganado").style.display = "block";
        //document.body.innerHTML += "Has ganado";
    }
}

function AbrirCelda(fila, columna, tablero) {
    if (tablero.notplay) return;
    if (tablero.matrizCeldas[fila][columna].bandera) return;

    // Mira si la celda pulsada tiene minas alrededor en caso de que no tenga significa que esta vacio y comprueba que tampoco sea una mina en ese caso se 
    // ejecuta la funcion de despejar recursivo
    if (tablero.matrizCeldas[fila][columna].minasAlrededor === 0 && !tablero.matrizCeldas[fila][columna].mina) {
        tablero.DespejarRecursivo(fila, columna);
    } else {
        tablero.matrizCeldas[fila][columna].abierta = true;
    }

    //console.log(fila, columna, tablero.matrizCeldas[fila][columna].mina);
    ActualizarAbiertas(tablero);
    
    // Actualizar la tabla del html con las celdas abiertas
    ComprobarVictoria(tablero);
}

function ColocarBandera(fila, columna, tablero) {
    if (tablero.notplay) return;
    tablero.matrizCeldas[fila][columna].bandera = !tablero.matrizCeldas[fila][columna].bandera;
    
    // Actualizar la tabla del html con las banderas
    ActualizarBanderas(tablero);
}

/* export function initJuego() {
    // Inabilitar el click derecho menu
    document.oncontextmenu = function () { return false; }

    // Verificar si la información del jugador está en las cookies
    const jugadorInfoCookie = getCookie("jugadorInfo");
    let jugador;

    if (jugadorInfoCookie) {
        // Si hay información del jugador en las cookies, utilizarla
        jugador = JSON.parse(jugadorInfoCookie);
        console.log("Información del jugador obtenida de las cookies:", jugador);
    } else {
        // Si no hay información del jugador en las cookies, abrir la ventana del formulario
        jugador = abrirFormulario();
    }

    // Resto del código para crear el tablero y mostrar la información del jugador
    tablero = new Tablero(5, 5, 5);
    console.log(jugador.toString());
    console.log(tablero.matrizCeldas);
    console.log("TableroMinas");
    PrintarTableroMinasConsole(tablero);
    console.log("TableroNumeros");
    PrintarNumeroMinas(tablero);
    CrearTableroDom(tablero);
}

function abrirFormulario() {
    // Aquí debes abrir la ventana del formulario y obtener la información del jugador
    // Puedes utilizar JavaScript para crear un formulario y mostrarlo en una ventana modal, por ejemplo
    // Luego, guarda la información del jugador en las cookies

    // Ejemplo de cómo guardar información en las cookies:
    const jugadorInfo = {
        nombre: "NombreDelJugador",
        // Agrega los demás campos del jugador
    };

    setCookie("jugadorInfo", JSON.stringify(jugadorInfo), 365);  // Guarda la información por 365 días

    return jugadorInfo;
}

// Funciones auxiliares para manejar cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}*/