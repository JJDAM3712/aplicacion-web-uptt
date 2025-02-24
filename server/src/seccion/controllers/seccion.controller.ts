import { pool } from '../../database/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import SeccionSQL from '../querys/seccion';

class SeccionController {
    // mostrar todas las seccion
    public async getSeccion(req:Request, res:Response): Promise<void> {
        try {
            const sql = SeccionSQL.getSeccionQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql);
            res.json(result);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // mostrar seccion id
    public async getSeccionById(req:Request, res:Response): Promise<void> {
        try {
            const sql = SeccionSQL.getSeccionQuery();
            const sql2 = SeccionSQL.getSeccionByIdQuery();
            
            //valida si la seccion
            const [result2] = await pool.query<RowDataPacket[]>(sql2, req.params.id);
            if(result2.length === 0) {
                res.status(404).json({message: "Seccion no encontrada"});
                return;
            }

            const [result] = await pool.query<RowDataPacket[]>(sql, req.params);
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({message: "error"});
        }
    }
    // insertar seccion
    public async postSeccion(req:Request, res:Response): Promise<void> {
        try {
            const sql = SeccionSQL.getSeccionQuery();
            
            const [result] = await pool.query<RowDataPacket[]>(sql, req.body);
            res.status(200).json({message: "Seccion Registrada Correctamente", data: result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // actualizar seccion
    public async putSeccion(req:Request, res:Response): Promise<void>{
        try {
            const sql = SeccionSQL.updateSeccionQuery();
            
            const [result] = await pool.query<RowDataPacket[]>(sql, req.body);

            res.status(200).json({messaje: "Seccion actualizada correctamente", data: result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // eliminar seccion
    public async deleteSeccion(req:Request, res:Response) : Promise<void>{
        try {
            const sql = SeccionSQL.deleteSeccionQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql, req.params);
            res.status(200).json({message: "Seccion eliminanda correctamennte", data: result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
}

export default new SeccionController();