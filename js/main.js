import { GestorTareas } from './GestorTareas.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Elementos del DOM
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskDeadline = document.getElementById('task-deadline');
    const searchInput = document.getElementById('search-input');
    const taskList = document.getElementById('task-list');
    const contadorTareas = document.getElementById('contador-tareas');
    const notificacion = document.getElementById('notificacion');

    // 2. Instancia del gestor
    const gestor = new GestorTareas();

    // 3. Si la lista está vacía, consultar la API automáticamente
    if (gestor.tareas.length === 0) {
        try {
            await gestor.cargarDesdeAPI();
        } catch (error) {
            mostrarMensaje('No se pudieron cargar las tareas de ejemplo', 'error');
        }
    }

    renderizarTareas();

    // 4. Temporizador global que actualiza los contadores cada 1 segundo
    setInterval(actualizarTemporizadores, 1000);

    // --- MANEJO DE EVENTOS ---

    // Crear tarea al enviar el formulario
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const texto = taskInput.value.trim();
        const fecha = taskDeadline.value;

        if (!texto) return;

        gestor.agregar(texto, fecha);
        renderizarTareas();
        taskForm.reset();
        mostrarMensaje('¡Tarea agregada exitosamente!', 'exito');
    });

    // Filtro reactivo en tiempo real (keyup / input)
    searchInput.addEventListener('input', () => {
        const filtro = searchInput.value.toLowerCase().trim();
        renderizarTareas(filtro);
    });

    // --- FUNCIONES VISUALES (DOM) ---

    function renderizarTareas(filtro = '') {
        taskList.innerHTML = '';

        const filtradas = gestor.tareas.filter(t => 
            (t.titulo || '').toLowerCase().includes(filtro)
        );

        // Actualizar contador
        if (contadorTareas) {
            const pendientes = gestor.obtenerPendientes();
            contadorTareas.textContent = `${pendientes} pendiente${pendientes === 1 ? '' : 's'}`;
        }

        if (filtradas.length === 0) {
            taskList.innerHTML = `
                <li style="text-align: center; color: var(--text-muted); padding: 24px 0; font-size: 0.9rem;">
                    No hay tareas disponibles.
                </li>`;
            return;
        }

        filtradas.forEach(tarea => {
            const li = document.createElement('li');
            li.className = `task-item ${tarea.completada ? 'completed' : ''}`;

            const info = document.createElement('div');
            info.className = 'task-info';

            const spanTitulo = document.createElement('span');
            spanTitulo.className = 'task-title';
            spanTitulo.textContent = tarea.titulo;
            info.appendChild(spanTitulo);

            // Temporizador dinámico si tiene fecha y no está terminada
            if (tarea.fechaLimite && !tarea.completada) {
                const countdown = document.createElement('span');
                countdown.className = 'task-countdown';
                countdown.dataset.fecha = tarea.fechaLimite;
                countdown.textContent = gestor.calcularTiempoRestante(tarea.fechaLimite);
                info.appendChild(countdown);
            }

            // Botones de acción
            const actions = document.createElement('div');
            actions.className = 'task-actions';

            const btnCompletar = document.createElement('button');
            btnCompletar.className = 'btn-complete';
            btnCompletar.textContent = tarea.completada ? 'Desmarcar' : 'Completar';
            btnCompletar.onclick = () => {
                gestor.alternarEstado(tarea.id);
                renderizarTareas(searchInput.value.toLowerCase().trim());
            };

            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-delete';
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.onclick = () => {
                gestor.eliminar(tarea.id);
                renderizarTareas(searchInput.value.toLowerCase().trim());
                mostrarMensaje('Tarea eliminada correctamente', 'exito');
            };

            actions.appendChild(btnCompletar);
            actions.appendChild(btnEliminar);

            li.appendChild(info);
            li.appendChild(actions);

            taskList.appendChild(li);
        });
    }

    function actualizarTemporizadores() {
        document.querySelectorAll('.task-countdown').forEach(badge => {
            if (badge.dataset.fecha) {
                badge.textContent = gestor.calcularTiempoRestante(badge.dataset.fecha);
            }
        });
    }

    function mostrarMensaje(texto, tipo) {
        if (!notificacion) return;
        notificacion.textContent = texto;
        notificacion.className = `notificacion ${tipo}`;
        setTimeout(() => {
            notificacion.className = 'notificacion oculta';
        }, 3000);
    }
});