import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'guevara'
});

conexion.connect((error) => {
    if (error) {
        console.error('Error de conexión: ', error);

    } else {
        console.log('Conectado a la base de datos');
}});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});