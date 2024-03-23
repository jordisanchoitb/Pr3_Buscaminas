import { Tablero } from "./Tablero.js";
import { Jugador } from "./Jugador.js";

let tablero;
let jugador;
let cookieArray
let cookieArrayInfo;
let jugadorInfoCookie;
let NombreCookies;
let ApellidoCookies;
let NickCookies;
let TelefonoCookies;
let FechanacimientoCookies;
let EmailCookies;
let ContrasenyaCookies;
let FilasCookies;
let ColumnasCookies;
let MinasCookies;

export function initJuego() {
    // Inabilitar el click derecho menu
    document.oncontextmenu = function () { return false; }
    
    window.addEventListener("message", function (event) {
        if (event.data === document.cookie) {
            jugadorInfoCookie = getCookie();
            if (jugadorInfoCookie.split(";").length === 7) {
                CreateCookie("Filas", 14);
                CreateCookie("Columnas", 18);
                CreateCookie("Minas", 40);
                jugadorInfoCookie = getCookie();
            };

            // Boton para abrir la ventana de configuracion del tablero lo creamos aqui
            // para que no se pueda abrir antes de que se haya hecho el formulario del jugador
            let botonconftablero = document.getElementById("conftablero");
            botonconftablero.addEventListener("click", function () {
                window.open("./src/html/formbuscaminas.html", "Configuracion Tablero", "width=500, height=500");
            });

            inicializarJuego();
        } 
    });  

    // Boton para abrir la ventana de configuracion del jugador
    let botonperfil = document.getElementById("perfil");
    botonperfil.addEventListener("click", function () {
        window.open("./src/html/formConfing.html", "Configuracion Usuario", "width=400, height=700");
    });

    // Boton para reiniciar el juego
    let botonrefresh = document.getElementById("reiniciar");
    botonrefresh.addEventListener("click", function () {
        location.reload();
    });    
    // Verificar si la información del jugador está en las cookies
    jugadorInfoCookie = getCookie();

    if (jugadorInfoCookie) {
        // Ponemos que funcione aqui el boton de la configuracion del tablero para evitar que se abra antes de que se haya hecho el formulario del jugador
        let botonconftablero = document.getElementById("conftablero");
        botonconftablero.addEventListener("click", function () {
            window.open("./src/html/formbuscaminas.html", "Configuracion Tablero", "width=500, height=500");
        });

        // Si hay información del jugador en las cookies, utilizarla
        inicializarJuego();
    } else {
        // Si no hay información del jugador en las cookies, abrir la ventana del formulario
        window.open("./src/html/formConfing.html", "Configuracion Usuario", "width=400, height=700");
    }
}

export function inicializarJuego() {
    document.getElementById("hasganado").style.display = "none";
    document.getElementById("hasperdido").style.display = "none";
    
    document.getElementById("tablero").innerHTML = "";
    cookieArray = jugadorInfoCookie.split(";");
    cookieArrayInfo = cookieArray.map(function (cookie) {
        return cookie.split("=");
    });
    
    AssignarValoresCookies(cookieArrayInfo);
    
    tablero = new Tablero(FilasCookies, ColumnasCookies, MinasCookies);
    jugador = new Jugador(NombreCookies, ApellidoCookies, NickCookies, parseInt(TelefonoCookies), FechanacimientoCookies, EmailCookies, ContrasenyaCookies);
    
    CrearTableroDom(tablero);
    let helloUser = document.getElementById("helloUser");
    helloUser.innerHTML = `Bienvenid@ ${jugador.nick}`;
    ActualizarPuntuacion();
}    

function getCookie() {
    return document.cookie
}

function ActualizarPuntuacion() {
    let divscoreUser = document.getElementById("divscoreUser");
    divscoreUser.innerHTML = `Puntuación: ${jugador.score}`;
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
            });
            celda.addEventListener("contextmenu", function () {
                ColocarBandera(i, j, tablero);
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
                celda.className = "bandera";
            } else if (celda.getAttribute("class") == "bandera"){
                celda.className = "tablacelda";
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
                    celda.className = "bomba";
                    tablero.notplay = true;
                    jugador.score = 0;
                    document.getElementById("hasperdido").style.display = "block";
                } else {
                    if (celda.getAttribute("class") == "bandera") {
                        celda.className = "tablacelda";
                    }
                    if (tablero.matrizCeldas[i][j].minasAlrededor != 0) {
                        celda.innerHTML = tablero.matrizCeldas[i][j].minasAlrededor;
                    }
                }
            }
        }
    }
}

function MirarCeldasAbiertas(tablero) {
    let contadorabiertas = 0;
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            if (tablero.matrizCeldas[i][j].abierta) {
                contadorabiertas++;
            }
        }
    }
    return contadorabiertas;
}

function BuscarMinas(tablero) {
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            if (tablero.matrizCeldas[i][j].mina) {
                tablero.matrizCeldas[i][j].abierta = true;
            }
        }
    }
}

function ComprobarVictoria(tablero) {
    let contadorabiertas = 0;
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            // Si la celda esta abierta y no es una mina para evitar contar las minas como celdas abiertas para ganar
            if (tablero.matrizCeldas[i][j].abierta && !tablero.matrizCeldas[i][j].mina) {
                contadorabiertas++;
            }
        }
    }

    if (contadorabiertas === tablero.filas * tablero.columnas - tablero.minas) {
        tablero.notplay = true;
        jugador.score = MirarCeldasAbiertas(tablero)*10;
        document.getElementById("hasganado").style.display = "block";
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
    
    // Si la celda pulsada es una mina se ejecuta la funcion de buscar minas que busca todas las minas del tablero
    if (tablero.matrizCeldas[fila][columna].mina) {
        BuscarMinas(tablero);
    }
    
    // Actualizar la tabla del html con las celdas abiertas
    ActualizarAbiertas(tablero);
    
    // Comprobar si se ha ganado
    ComprobarVictoria(tablero);

    // Actualizar la puntuación
    if (!tablero.notplay) {
        jugador.score = MirarCeldasAbiertas(tablero)*10;
    }
    ActualizarPuntuacion();
}

function ColocarBandera(fila, columna, tablero) {
    if (tablero.notplay) return;

    // Cambiar el estado de la bandera en función de si ya estaba puesta o no
    tablero.matrizCeldas[fila][columna].bandera = !tablero.matrizCeldas[fila][columna].bandera;
    
    // Actualizar la tabla del html con las banderas
    ActualizarBanderas(tablero);
}

function CreateCookie(name, value, days) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

function AssignarValoresCookies(cookieArrayInfo) {
    // Asignar valores de las cookies a las variables
    // Quitando los espacios de izquierda i derecha de la string para evitar problemas de comparación
    // usando .trimLeft().trimRight()
    for (let i = 0; i < cookieArrayInfo.length; i++) {
        if (cookieArrayInfo[i][0].trimLeft().trimRight() == "Nombre") {
            NombreCookies = cookieArrayInfo[i][1];
        } else if (cookieArrayInfo[i][0].trimLeft().trimRight() == "Apellido") {
            ApellidoCookies = cookieArrayInfo[i][1];
        } else if (cookieArrayInfo[i][0].trimLeft().trimRight() == "Nick") {
            NickCookies = cookieArrayInfo[i][1];
        } else if (cookieArrayInfo[i][0].trimLeft().trimRight() == "Telefono") {
            TelefonoCookies = cookieArrayInfo[i][1];
        } else if (cookieArrayInfo[i][0].trimLeft().trimRight() == "Fechanacimiento") {
            FechanacimientoCookies = cookieArrayInfo[i][1];
        } else if (cookieArrayInfo[i][0].trimLeft().trimRight() == "Email") {
            EmailCookies = cookieArrayInfo[i][1];
        } else if (cookieArrayInfo[i][0].trimLeft().trimRight() == "Contrasenya") {
            ContrasenyaCookies = cookieArrayInfo[i][1];
        } else if (cookieArrayInfo[i][0].trimLeft().trimRight() == "Filas") {
            FilasCookies = cookieArrayInfo[i][1];
        } else if (cookieArrayInfo[i][0].trimLeft().trimRight() == "Columnas") {
            ColumnasCookies = cookieArrayInfo[i][1];
        } else if (cookieArrayInfo[i][0].trimLeft().trimRight() == "Minas") {
            MinasCookies = cookieArrayInfo[i][1];
        }
    }
}


// Funciones de debug
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
function PrintarVariables() {
    console.log("NombreCookies: " + NombreCookies);
    console.log("ApellidoCookies: " + ApellidoCookies);
    console.log("NickCookies: " + NickCookies);
    console.log("TelefonoCookies: " + TelefonoCookies);
    console.log("FechanacimientoCookies: " + FechanacimientoCookies);
    console.log("EmailCookies: " + EmailCookies);
    console.log("ContrasenyaCookies: " + ContrasenyaCookies);
    console.log("FilasCookies: " + FilasCookies);
    console.log("ColumnasCookies: " + ColumnasCookies);
    console.log("MinasCookies: " + MinasCookies);
}