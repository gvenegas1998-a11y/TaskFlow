const STORAGE_KEY = 'taskflow_tareas_db';

/**
 * Servicio encargado de interactuar con la memoria local del navegador
 */
export const StorageService = {
    guardar(tareas) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
        } catch (error) {
            console.error('Error al persistir datos en LocalStorage:', error);
        }
    },

    obtener() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error al recuperar datos de LocalStorage:', error);
            return [];
        }
    }
};