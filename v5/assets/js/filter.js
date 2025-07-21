// filter.js
// Este archivo añade buscador y ordenamiento a la lista de usuarios.

// Importamos la lista de usuarios y la función renderUsers desde scripts.js
import { users, renderUsers } from './scripts.js';

// Obtenemos las referencias a los elementos del DOM (input y botones)
const searchInput = document.getElementById('searchInput');
const sortAscBtn = document.getElementById('sortAsc');
const sortDescBtn = document.getElementById('sortDesc');

// =========================
// PAGINACIÓN SIMPLE
// =========================
let currentPage = 1;
const USERS_PER_PAGE = 5;
let lastFiltered = null; // Guarda el último filtro aplicado

const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const paginationControls = document.getElementById('paginationControls');

function renderUsersPaginated(list = null) {
    const usersToShow = list || users;
    lastFiltered = usersToShow;
    const totalPages = Math.ceil(usersToShow.length / USERS_PER_PAGE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    const start = (currentPage - 1) * USERS_PER_PAGE;
    const end = start + USERS_PER_PAGE;
    const paginatedUsers = usersToShow.slice(start, end);
    renderUsers(paginatedUsers);
    if (usersToShow.length > USERS_PER_PAGE) {
        paginationControls.style.display = 'flex';
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    } else {
        paginationControls.style.display = 'none';
    }
}

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderUsersPaginated(lastFiltered);
    }
});
nextPageBtn.addEventListener('click', () => {
    const usersToShow = lastFiltered || users;
    const totalPages = Math.ceil(usersToShow.length / USERS_PER_PAGE) || 1;
    if (currentPage < totalPages) {
        currentPage++;
        renderUsersPaginated(usersToShow);
    }
});

// =========================
// BUSCADOR
// =========================
// Escuchamos el evento "input" para capturar lo que el usuario escribe.
searchInput.addEventListener('input', () => {
    currentPage = 1;
    const term = searchInput.value.toLowerCase();
    const filtered = users.filter(u =>
        u.fullName.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
    renderUsersPaginated(filtered);
});

// =========================
// ORDENAMIENTO
// =========================

// Botón para ordenar de A-Z por nombre
sortAscBtn.addEventListener('click', () => {
    users.sort((a, b) => a.fullName.localeCompare(b.fullName));
    currentPage = 1;
    renderUsersPaginated(lastFiltered || users);
});

// Botón para ordenar de Z-A por nombre
sortDescBtn.addEventListener('click', () => {
    users.sort((a, b) => b.fullName.localeCompare(a.fullName));
    currentPage = 1;
    renderUsersPaginated(lastFiltered || users);
});

// =========================
// RENDER INICIAL
// =========================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => renderUsersPaginated(), 500); // Espera a que users se cargue
});



/*
Función tradicional
function sumar(x, y) {
  return x + y;
}

Arrow function
const sumar = (x, y) => x + y;



function(a, b) {
  return a.fullName.localeCompare(b.fullName);
}

(a, b) => a.fullName.localeCompare(b.fullName)

Explicación de la línea: 
users.sort() necesita que le pasemos una función de comparación con dos parámetros, por ejemplo function(a, b) { ... }, donde:
- a y b son dos elementos del array que sort() compara entre sí.
- El valor de retorno determina el orden:
  - Si devuelve negativo, a va antes que b.
  - Si devuelve positivo, b va antes que a.
  - Si devuelve 0, no se cambia su orden relativo.

¿Qué hace localeCompare()?
localeCompare() es un método de cadenas de texto que compara dos strings según el idioma local:
- Devuelve -1 si a debe ir antes de b.
- Devuelve 1 si a debe ir después de b.
- Devuelve 0 si son iguales.

Por ejemplo:
"Juan".localeCompare("Pedro"); // -1  (porque J va antes que P)
"Pedro".localeCompare("Juan"); //  1  (P va después de J)
"Juan".localeCompare("Juan");  //  0  (son iguales)

Entonces:
users.sort((a, b) => a.fullName.localeCompare(b.fullName));
Ordena el array users alfabéticamente de A a Z según la propiedad fullName de cada usuario.
*/