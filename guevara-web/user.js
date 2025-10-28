function nombre(){
    const userNombre = localStorage.getItem('userNombre');
    const nombre = document.getElementById('nombre');
    if (userNombre && nombre) {
        nombre.textContent = userNombre;
    }
}

function btnBoletin(rol){
    const botonP = document.getElementById('panel');
    const botonB = document.getElementById('boletin')
    if (rol == 2 || rol == 3) {
        botonP.classList.remove('oculto')
        botonB.classList.toggle('oculto')
    }
}

function btnCerrar(rol) {
    const cerrar = document.getElementById('cerrar');
    const iniciar = document.getElementById('iniciar');
    if (rol == 1 || rol == 2 || rol == 3) {
        cerrar.classList.remove('oculto');
        iniciar.classList.add('oculto');
    }
}

document.getElementById('cerrar').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('userNombre');
    localStorage.removeItem('rol');
    window.location.href = 'index.html';
});


document.getElementById('boletinA').addEventListener('click', () => window.location.href = `boletin.html?userId=${id}`);

const rolUser = localStorage.getItem('rol');
const id = localStorage.getItem('userID');
btnBoletin(rolUser);
btnCerrar(rolUser);
nombre();