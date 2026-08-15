import { Tarea } from './Tarea.js';
import { StorageService } from './storage.js';

/**
 * Administrador general de la colección de tareas
 */
export class GestorTareas {
    constructor() {
        this.tareas = [];
        this.cargarDesdeStorage();
    }

    // Recupera tareas previas y las convierte en instancias de la clase Tarea
    cargarDesdeStorage() {
        const guardadas = StorageService.obtener();
        if (guardadas.length > 0) {
            this.tareas = guardadas.map(t => new Tarea(
                t.id, 
                t.titulo || t.descripcion || 'Sin título', 
                t.completada, 
                t.fechaLimite
            ));
        }
    }

    // Petición asíncrona a la API externa
    async cargarDesdeAPI() {
        try {
            const respuesta = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=4');
            if (!respuesta.ok) throw new Error('Error al conectar con la API');

            const datos = await respuesta.json();

            // Transformar al modelo local con un temporizador de prueba en la última tarea
            this.tareas = datos.map((item, index) => new Tarea(
                item.id,
                item.title,
                item.completed,
                index === 3 ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16) : null
            ));

            this.guardar();
        } catch (error) {
            console.error('Error al sincronizar con API remota:', error);
            throw error;
        }
    }

    agregar(titulo, fechaLimite) {
        const nuevaTarea = new Tarea(Date.now(), titulo, false, fechaLimite || null);
        this.tareas.unshift(nuevaTarea);
        this.guardar();
        return nuevaTarea;
    }

    alternarEstado(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.alternar();
            this.guardar();
        }
    }

    eliminar(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.guardar();
    }

    guardar() {
        StorageService.guardar(this.tareas);
    }

    obtenerPendientes() {
        return this.tareas.filter(t => !t.completada).length;
    }

    // Cálculo dinámico del tiempo restante
    calcularTiempoRestante(fechaLimiteStr) {
        const ahora = new Date().getTime();
        const limite = new Date(fechaLimiteStr).getTime();
        const diferencia = limite - ahora;

        if (diferencia <= 0) return '⏰ Tiempo expirado';

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segs = Math.floor((diferencia % (1000 * 60)) / 1000);

        return `⏳ Faltan: ${dias}d ${horas}h ${mins}m ${segs}s`;
    }
}