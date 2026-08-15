/**
 * Clase que representa una Tarea individual en el sistema
 */
export class Tarea {
    constructor(id, titulo, completada = false, fechaLimite = null) {
        this.id = id;
        this.titulo = titulo;
        this.completada = completada;
        this.fechaLimite = fechaLimite;
    }

    // Método para alternar estado
    alternar() {
        this.completada = !this.completada;
    }
}