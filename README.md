# TaskFlow — Aplicación de Gestión de Tareas

TaskFlow es una aplicación web interactiva desarrollada con **JavaScript (ES6+)**, estructurada bajo el paradigma de **Programación Orientada a Objetos (POO)** y **arquitectura modular**. Permite gestionar tareas diarias, realizar búsquedas reactivas en tiempo real, monitorear tiempos límite mediante cuentas regresivas dinámicas y sincronizar datos con almacenamiento local y APIs remotas.

---

## Características Principales

* **Gestión de Tareas (CRUD):** Creación, listado, marcado de estado (completada/pendiente) y eliminación de tareas.
* **Búsqueda en Tiempo Real:** Filtrado interactivo mediante el evento `input`/`keyup` sin recargar la página.
* **Cuentas Regresivas en Vivo:** Temporizador dinámico por tarea implementado con `setInterval()` que calcula días, horas, minutos y segundos restantes.
* **Persistencia Local:** Almacenamiento y sincronización automática de datos a través de `localStorage` (`JSON.stringify` / `JSON.parse`).
* **Consumo de API REST Asíncrona:** Carga inicial de datos de prueba desde la API externa *JSONPlaceholder* utilizando `fetch` y `async/await`.
* **Notificaciones de Estado:** Sistema de feedback visual temporal para confirmar acciones de usuario (`setTimeout()`).
* **Diseño Responsivo:** Interfaz moderna, adaptativa y visualmente equilibrada para escritorio y dispositivos móviles.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Semántica web limpia y estructurada.
* **CSS3:** Variables nativas (`:root`), Flexbox, CSS Grid, media queries y transiciones suaves.
* **JavaScript (ES6+):**
  * Clases y Programación Orientada a Objetos (POO).
  * Módulos nativos (`import` / `export`).
  * Asincronía con Promesas y sintaxis `async` / `await`.
  * Manipulación dinámica del DOM (`document.createElement`, `appendChild`, etc.).
  * Web Storage API (`localStorage`).
  * Timers de la Web API (`setInterval`, `setTimeout`).

---

## 📂 Estructura del Proyecto

El proyecto está organizado siguiendo el principio de responsabilidad única para asegurar modularidad y fácil mantenimiento:

```text
TaskFlow/
├── index.html          # Estructura principal y enlace de módulos
├── css/
│   └── style.css       # Estilos visuales, temas y diseño responsivo
├── js/
│   ├── Tarea.js        # Modelo/Entidad (Clase Tarea con sus propiedades)
│   ├── storage.js      # Servicio de persistencia en LocalStorage
│   ├── GestorTareas.js # Lógica de negocio, métodos CRUD, cálculo de tiempo y API
│   └── main.js         # Punto de entrada, manejadores de eventos y renderizado del DOM
└── README.md           # Documentación técnica del repositorio
