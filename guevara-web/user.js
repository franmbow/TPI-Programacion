function nombre(){
    const userNombre = localStorage.getItem('userNombre');
    const logoutBtn = document.getElementById('logoutBtn');
    const nombre = document.getElementById('nombre');
    if (userNombre && nombre) {
        nombre.textContent = userNombre;
    }
}
nombre();