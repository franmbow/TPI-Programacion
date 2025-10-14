document.getElementById('signForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userNombre = document.getElementById('usuario').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contraseñaC = document.getElementById('contraseñaC').value.trim();
    const errmsg = document.getElementById('errmsg');
    if (contraseña !== contraseñaC) {
        errmsg.textContent = "Las contraseñas no coinciden";
        return;
    }
    try {
        const respuesta = await fetch('http://localhost:3000/sign', {
            method: 'POST',
            headers: { "Content-Type" : 'application/json' },
            body: JSON.stringify({ userNombre, contraseña, correo})
        });
        if (!respuesta.ok) {throw new Error("Error al conectar con el servidor");}
        const resultado = await respuesta.json();
        console.log("user", resultado);
        if (respuesta.status === 201) {
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error("Error:", error);
    };
});