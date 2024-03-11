export class Jugador {
    nombre;
    apellido;
    nick;
    telefono;
    fechaNacimiento;
    #edad;
    contrasenya;
    score;
    fechaScore;
    constructor(nombre, apellido, nick, telefono, fechaNacimiento, contrasenya) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nick = nick;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.contrasenya = contrasenya;
        this.score = 0;
        this.#edad = this.calcularEdad();
    }
    get edad() {
        return this.#edad;
    }
    set edad(value) {
        alert("No puedes cambiar la edad");
        this.#edad = this.calcularEdad();
    }
    
    toString() {
        return `Nombre: ${this.nombre}\nApellido: ${this.apellido}\nNick: ${this.nick}\nFecha de nacimiento: ${this.fechaNacimiento}\nEdad: ${this.edad}\nContraseña: ${this.contrasenya}`;
    }

    calcularEdad() {
        let fechaActual = new Date();
        let fechaNacimiento = new Date(this.fechaNacimiento);
        let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        let mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        return edad;
    }
}