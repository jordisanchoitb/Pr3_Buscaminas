import { Zelda } from "./Zelda.js";
export class Tablero {
    constructor(filas, columnas, minas) {
        this.filas = filas;
        this.columnas = columnas;
        this.minas = minas;
        this.notplay = false;
        this.matrizCeldas = [];
        this.CrearTablero();
        this.ColocarMinas();
        this.CalcularMinasAlrededor();
    }

    CrearTablero() {
        for (let i = 0; i < this.filas; i++) {
            this.matrizCeldas[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                this.matrizCeldas[i][j] = new Zelda(i, j);
            }
        }
    }

    ColocarMinas() {
        let minascolocadas = 0;
        while (minascolocadas < this.minas) {
            let PosAleatoriaI = Math.floor(Math.random() * this.filas);
            let PosAleatoriaJ = Math.floor(Math.random() * this.columnas);
            if (!this.matrizCeldas[PosAleatoriaI][PosAleatoriaJ].mina) {
                this.matrizCeldas[PosAleatoriaI][PosAleatoriaJ].mina = true;
                minascolocadas++;
            }
        }

    }

    CalcularMinasAlrededor() {
        const arrayPos_I = [-1, 0, 1]
        // const arrayPos_I = [-1,-1,-1,0,0,1,1,1]

        const arrayPos_J = [-1, 0, 1]
        // const arrayPos_J = [-1,0,1,-1,1,-1,0,1]

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                if (!this.matrizCeldas[i][j].mina) {
                    let minasAlrededorCount = 0;
                    for (const posi of arrayPos_I) {
                        for (const posj of arrayPos_J) {
                            try {
                                if (this.matrizCeldas[posi + i][posj + j].mina) {
                                    minasAlrededorCount++;
                                }
                            } catch (Exeptions) { }
                        }
                        this.matrizCeldas[i][j].minasAlrededor = minasAlrededorCount;
                    }
                }
            }
        }
    }

    DespejarRecursivo(fila, columna) {
        // En caso de que este abierta significara que ya a pasado por ahi entonces no hara nada y saldra
        if (this.matrizCeldas[fila][columna].abierta) {
            return;
        }

        this.matrizCeldas[fila][columna].abierta = true;

        if (this.matrizCeldas[fila][columna].minasAlrededor === 0) {
            // Guardo las posiciones a las que buscara
            const arrayPos_I = [-1, 0, 1];
            const arrayPos_J = [-1, 0, 1];

            for (const posi of arrayPos_I) {
                for (const posj of arrayPos_J) {

                    // Guardo las posiciones nuevas a las que buscara
                    const nuevaFila = fila + posi;
                    const nuevaColumna = columna + posj;

                    // Comprueba que no este fuera de los limites de la matriz
                    if (nuevaFila >= 0 && nuevaFila < this.filas && nuevaColumna >= 0 && nuevaColumna < this.columnas) {
                        this.DespejarRecursivo(nuevaFila, nuevaColumna);
                    }
                }
            }
        }
    }
}