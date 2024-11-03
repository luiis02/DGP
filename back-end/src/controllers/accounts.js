// controllers/accounts.js

import { connect } from '../dataBase.js'

export const getStudents = async (req, res) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query("SELECT * FROM estudiante");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createStudent = async (req, res) => {
    try {
        const connection = await connect();
        console.log(req.body.nombre);
        console.log(req.body.apellido);
        const result = await connection.query('INSERT INTO estudiante (id, nombre, apellido) VALUES (?, ?,?)', [
            req.body.id, 
            req.body.nombre,
            req.body.apellido,
        ]);
        console.log(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   