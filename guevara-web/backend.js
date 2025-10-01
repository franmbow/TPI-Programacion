document.getElementById('logform').addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();
    try {
        const respuesta = await fetch('http://localhost:3000/guevara', {
            method: 'POST',
            headers: { "Content-Type" : 'application/json' },
            body: JSON.stringify({ usuario, contraseña})
        });
        if (!respuesta.ok) {throw new Error("Error al conectar con el servidor");}
        const resultado = await respuesta.json();
        console.log("user", resultado);
    } catch (error) {
        console.error("Error:", error);
    }
});