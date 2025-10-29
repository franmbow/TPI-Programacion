async function cargarMaterias() {
    try {
        const respuesta = await fetch('http://localhost:3000/materias');
        if (!respuesta.ok) throw new Error('Error al conectar con el servidor');
        const materias = await respuesta.json();

        materias.forEach((materia, index) => {
            const idx = index + 1;
            const selector = `th.materia${idx}`;
            const th = document.querySelector(selector);
            const nombre = materia.materiaNombre === '-' ? '' : materia.materiaNombre;
            th.textContent = nombre;
        });
    } catch (err) {
        console.error('cargarMaterias error:', err);
    }
}
cargarMaterias();

async function cargarNotas(userID) {
    try {
        const respuesta = await fetch(`http://localhost:3000/notas/${userID}`);
        if (!respuesta.ok) throw new Error('Error al conectar con el servidor');
        const notas = await respuesta.json();

        const materiaHeaders = document.querySelectorAll('#tabla-notas th[id="materias"]');
        const materiaMap = {};
        materiaHeaders.forEach((th, index) => {
            const nombre = th.textContent.trim();
            if (nombre) materiaMap[nombre] = index + 1;
        });

        notas.forEach(nota => {
            const materiaNombre = nota.materiaNombre;
            const cuatrimestre = nota.cuatrimestre;
            const informe = nota.informe;
            const valorNota = nota.notaNum;

            const materiaIndex = materiaMap[materiaNombre];
            if (!materiaIndex) return;

            const selector = `td[data-cuatrimestre="${cuatrimestre}"][data-informe="${informe}"][data-materia="${materiaIndex}"]`;
            const celda = document.querySelector(selector);
            if (celda) celda.textContent = valorNota;
        });
    } catch (err) {
        console.error('cargarNotas error:', err);
    }
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.getElementById('formNota').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userIDFK = getQueryParam('userId');
    const materiaIDFK = document.getElementById('materiaSelect').value;
    const cuatrimestre = document.getElementById('cuatrimestreSelect').value;
    const informe = document.getElementById('informeSelect').value;
    const notaNum = document.getElementById('notaValor').value.trim();
    
    try {
        const resp = await fetch('http://localhost:3000/nota', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userIDFK, materiaIDFK, cuatrimestre, informe, notaNum })
        });

        const resultado = await resp.json();
        if (resp.ok) {
            location.reload()
        } else {
            console.error('Error al insertar la nota:', resultado);
        }
    } catch (error) {
        console.error('Error al insertar la nota:', error);
    }
});


function btnNotas(rol) {
    const boton = document.getElementById('añadir');
    if (rol == 2 || rol == 3) {
        boton.classList.remove('oculto');
    }
}

document.getElementById('añadir').addEventListener('click', (e) => {
    e.preventDefault();
    const divNota = document.getElementById('divNotas');
    divNota.classList.toggle('oculto');
});

async function userData(userID) {
    try {
        const resp = await fetch(`http://localhost:3000/userData/${userID}`)
        const thAlumno = document.getElementById('thAlumno');
        
        const thCurso = document.getElementById('thCurso');
        if (!resp.ok) throw new Error('Error al conectar con el servidor');
        const user = await resp.json();
        const u = Array.isArray(user) ? user[0] : user;
        thAlumno.textContent = `Alumno: ${u?.userNombre}`;
        thCurso.textContent = `Curso: 7°${u?.cursoIDFK !== null ? u?.cursoIDFK : 'Sin asignar'}`;
    } catch (error) {
        console.error('Error al obtener el usuario', error);
    }
};


const userID = getQueryParam('userId');
const rol = localStorage.getItem('rol');
userData(userID);
btnNotas(rol);
cargarNotas(userID);