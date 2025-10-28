import { Router } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../sv.js';
import jwt from 'jsonwebtoken';

export const logRouter = Router();

logRouter.post('/log', (req, res) => {
    const { userNombre, contraseña } = req.body;
    const queryUser = 'SELECT * FROM user WHERE userNombre = ?';
    db.query(queryUser, [userNombre], async (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al conectar con el servidor' });
        }
        if (results.length === 0) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }
        const user = results[0];
        const match = await bcrypt.compare(contraseña, user.contraseña);
        if (!match) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }

        req.session.user = { userID: user.userID, userNombre: user.userNombre, rol: user.rol };

        return res.status(201).json(
            { 
                mensaje: 'Inicio de sesión exitoso',
                userID: user.userID,
                userNombre: user.userNombre,
                rol: user.rol
            }
        );
    })
})

logRouter.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ mensaje: 'Error al cerrar sesión' });
        res.clearCookie('connect.sid');
        res.json({ mensaje: 'Sesión cerrada correctamente' });
});
});

export default logRouter;