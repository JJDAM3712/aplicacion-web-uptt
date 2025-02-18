import { pool } from '../../database/db.js';

export const getNotas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notas');
        res.json(result[0]);
    } catch (error) {
        console.error(error);
    }
}