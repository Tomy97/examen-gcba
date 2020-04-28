export class RenaperResponse {
    apellido: string;
    nombres: string;
    fechaNacimiento: string;
    mensaje: string;

    constructor(apellido: string = '', nombres: string = '', fechaNacimiento: string = '', mensaje: string = '') {
        this.apellido = apellido;
        this.nombres = nombres;
        this.fechaNacimiento = fechaNacimiento;
        this.mensaje = mensaje;
    }
}
