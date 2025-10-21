import { Router } from "express";
export const panelRouter = Router();
import { db } from "../sv.js";

panelRouter.get('/panel', (req, res) => {
    const soli = 'SELECT * FROM user';
    db.query(soli, (err, resultado) => {
        if (err) {
            console.error('Error al ejecutar la consulta: ', err);
            return;
        } else {
            res.status(200).json(resultado);
        }
    });
});

export default panelRouter;