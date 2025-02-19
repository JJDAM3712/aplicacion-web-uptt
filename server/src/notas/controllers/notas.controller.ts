import { pool } from '../../database/db';
import { Request, Response } from 'express';


class NotasController {
    public async getNotas(req:Request, res:Response) {
        try {
            const result = await pool.query('SELECT * FROM notas');
            res.json(result[0]);
        } catch (error) {
            console.error(error);
        }
    }
}

export default new NotasController();