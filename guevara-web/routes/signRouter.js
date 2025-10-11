import { Router } from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import { db } from '../sv.js';

export const signRouter = Router();

signRouter.post('/user', async (req, res) => {
    const { userNombre, contraseña, correo } = req.body;
    const hash = await bcrypt.hash(contraseña, 10);
    const query = 'INSERT INTO user (userNombre, contraseña, correo) VALUES (?, ?, ?)';
    
    db.query(query, [userNombre, hash, correo], (err, result) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al registrar el usuario' });
        } else {
            return res.status(201).json({ mensaje: 'Usuario registrado exitosamente', userID: result.insertId });
        }
    });
});