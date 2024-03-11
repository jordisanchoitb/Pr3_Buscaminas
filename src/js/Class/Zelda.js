export class Zelda {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.mina = false;
        this.bandera = false;
        this.minasAlrededor = 0;
        this.abierta = false;
    }
}