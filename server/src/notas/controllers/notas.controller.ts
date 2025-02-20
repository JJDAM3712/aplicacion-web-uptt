import { pool } from '../../database/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import NotasSQL from '../querys/notas';

class NotasController {
    // mostrar todas las notas
    public async getNotas(req:Request, res:Response): Promise<void> {
        try {
            const sql = NotasSQL.getNotasQuery();
            const result = await pool.query<RowDataPacket[]>(sql);
            res.json(result[0]);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // mostrar nota por id
    public async getNotasById(req:Request, res:Response): Promise<void> {
        try {
            const sql = NotasSQL.getNotasByIdQery();
            const sql2 = NotasSQL.getNotasByIdQery();
            
            //valida si la nota existe
            const [result2] = await pool.query<RowDataPacket[]>(sql2, req.params);
            if(result2.length == 0) {
                res.status(404).json({message: "Nota no encontrada"});
                return;
            }

            const [result] = await pool.query<RowDataPacket[]>(sql, req.params);
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({message: "error"});
        }
    }
    // insertar nota
    public async postNotas(req:Request, res:Response): Promise<void> {
        try {
            const sql = NotasSQL.postNotasQuery();
            
            const [result] = await pool.query<RowDataPacket[]>(sql, req.body);
            res.status(200).json({message: "Nota registrada correctamente", data: result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // actualizar notas
    public async putNotas(req:Request, res:Response): Promise<void> {
        try {
            const sql = NotasSQL.putNotasQuery();
            
            const [result] = await pool.query<RowDataPacket[]>(sql, req.body);

            res.status(200).json({messaje: "Nota actualizada Correctamente", data: result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // eliminar notas
    public async deleteNotas(req:Request, res:Response) : Promise<void>{
        try {
            const sql = NotasSQL.deleteNotasQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql, req.params);
            res.status(200).json({message: "Nota eliminada correctamente", data: result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
}

export default new NotasController();