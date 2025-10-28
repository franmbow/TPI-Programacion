import { Router } from "express";
export const panelRouter = Router();
import { db } from "../sv.js";

panelRouter.get('/panel', (req, res) => {
    const soli = 'SELECT userID, userNombre, rol, correo FROM user';
    db.query(soli, (err, resultado) => {
        if (err) {
            console.error('Error al ejecutar la consulta: ', err);
            return res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
        } else {
            res.status(200).json(resultado);
        }
    });
});

panelRouter.put('/panel/modificar/:userID', (req, res) => {
    const { userID } = req.params;
    const { rol, cursoIDFK } = req.body;
    if (!rol || !cursoIDFK) {
        return res.status(400).json({ mensaje: 'Faltan datos en la solicitud' });
    }

    const soli = 'UPDATE user SET rol = ?, cursoIDFK = ? WHERE userID = ?';
    db.query(soli, [rol, cursoIDFK, userID], (err, resultado) => {
        if (err) {
            console.error('Error al ejecutar la consulta: ', err);
            return res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
        } else {
            return res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
        }
    });
});

export default panelRouter;
