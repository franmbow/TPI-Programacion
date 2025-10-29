import { Router } from 'express';
import { db } from '../sv.js';

export const notasRouter = Router();

notasRouter.get('/materias' , async (req, res) => {
    const soli = 'SELECT * FROM materia';
    db.query(soli, (err, resultado) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Error al pedir materias');
    } else {
        res.status(200).json(resultado);
    };
    });
});

notasRouter.get('/notas/:userID', async (req, res) => {
    const { userID } = req.params;
    const soli = 'SELECT n.notaID, n.notaNum, n.informe, n.cuatrimestre, m.materiaNombre FROM nota n JOIN materia m ON n.materiaIDFK = m.materiaID WHERE n.userIDFK = ?';
    db.query(soli, [userID], async (err, resultado) => {
    if (err) {
        res.status(500).send('Error al pedir notas');
    } else {
        res.status(200).json(resultado);
    };
    });
});

notasRouter.post('/nota', async (req, res) => {
    const { userIDFK, materiaIDFK, cuatrimestre, informe, notaNum } = req.body;
    const soli = 'INSERT INTO nota (userIDFK, materiaIDFK, cuatrimestre, informe, notaNum) VALUES (?, ?, ?, ?, ?)';

    if (!userIDFK || !materiaIDFK || !cuatrimestre || !informe || notaNum === undefined) {
        return res.status(400).json({error: 'Faltan datos obligatorios'});
    }

    db.query(soli, [userIDFK, materiaIDFK, cuatrimestre, informe, notaNum], (err, resultado) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ mensaje: 'Error al agregar nota'} );
    } else {
        res.status(200).json({mensaje: 'Nota agregada correctamente'});
    };
    });
});

notasRouter.get('/userData/:userID', (req, res) => {
    const { userID } = req.params;
    const soli = 'SELECT userID, userNombre, rol, cursoIDFK FROM user WHERE userID = ?';
    db.query(soli, [userID], (err, resultado) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Error al pedir user');
    } else {
        res.status(200).json(resultado);
    };
    });
});

export default notasRouter; 