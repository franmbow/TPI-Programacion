import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mysql from 'mysql';
import { signRouter } from './routes/signRouter.js';
import { logRouter } from './routes/logRouter.js';
import { notasRouter } from './routes/notasRouter.js';
import { panelRouter } from './routes/panelRouter.js';
import { userRouter } from './routes/userRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
    secret: '473862',
    resave: false,
    saveUninitialized: true,
}));

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
app.use('/', notasRouter);
app.use('/', panelRouter);
app.use('/', userRouter);


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});