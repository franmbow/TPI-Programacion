document.addEventListener("DOMContentLoaded", async () => {
    const ul = document.querySelector("#usuarios ul");
    const plantilla = ul.querySelector('li');

    try{
        const respuesta = await fetch("http://localhost:3000/panel");
        const usuarios = await respuesta.json();

        ul.innerHTML = '';
        usuarios.forEach(usuarios => {
            const li = plantilla.cloneNode(true);
            li.querySelector('#nombre').textContent = usuarios.userNombre;
            li.querySelector('#rol').textContent = usuarios.rol;
            li.querySelector('#mail').textContent = usuarios.correo;

            const link = li.querySelector('#verBoletin');
            link.href = `boletin.html?userId=${usuarios.userID}`;

            const form = li.querySelector('#mod');
            if (form) form.id = `form-${usuarios.userID}`;

            const modiBtn = li.querySelector('#modi');
            if (modiBtn && form) {
                modiBtn.addEventListener('click', (e) => {
                    form.classList.toggle('oculto');
                    link.classList.toggle('oculto');
                });
            }

            const guardarBtn = li.querySelector('#guardar');
            if (guardarBtn) {
                guardarBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    guardar(usuarios.userID);
                });
            }
            
            ul.appendChild(li);
        });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
});


function guardar(usuarioID) {
    const form = document.getElementById(`form-${usuarioID}`);
    if (!form) {
        console.error(`No se encontró el formulario para el usuario ${usuarioID}`);
        return;
    }
    const rol = form.querySelector('select[name="rol"]').value;
    const cursoIDFK = form.querySelector('select[name="curso"]').value;

    fetch(`http://localhost:3000/panel/modificar/${usuarioID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol, cursoIDFK })
    })
    .then(response => response.json())
    .then(data => {
        location.reload();
    })
    .catch(error => {
        console.error('Error al guardar los cambios:', error);
    });
}