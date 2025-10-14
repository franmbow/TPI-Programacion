import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import { signRouter } from './routes/signRouter.js';
import { logRouter } from './routes/logRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'guevara'
});

db.getConnection((error) => {
    if (error) {
        console.error('Error de conexión: ', error);

    } else {
        console.log('Conectado a la base de datos');
}});

app.use('/', signRouter);
app.use('/', logRouter);

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});