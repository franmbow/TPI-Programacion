document.getElementById('logForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userNombre = document.getElementById('usuario').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();

    try {
        const respuesta = await fetch('http://localhost:3000/log', {
            method: 'POST',
            headers: { "Content-Type" : 'application/json' },
            body: JSON.stringify({ userNombre, contraseña})
        })
        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.mensaje || "Error al iniciar sesion");
        }
        const resultado = await respuesta.json();
        console.log("user", resultado);
        if (respuesta.status === 201) {
            localStorage.setItem('token', resultado.token);
            localStorage.setItem('userNombre', resultado.userNombre);
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error("Error:", error);
    }
})