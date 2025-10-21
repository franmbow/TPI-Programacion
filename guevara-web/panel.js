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
            ul.appendChild(li);

            const link = li.querySelector('#verBoletin');
            link.href = `boletin.html?userId=${usuarios.id}`;

            ul.appendChild(li);
        });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
});