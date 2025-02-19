import { Request, Response } from "express";
import { pool } from "../../database/db";
import { RowDataPacket } from "mysql2";
import MateriasSQL from "../querys/materias";


class MateriaController {
    // mostrar todos los datos de las materias
    public async getMaterias(req:Request, res:Response): Promise<void>{
        try {
            const sql = MateriasSQL.getMateriasQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql);
            res.json(result);
        } catch (error) {
            console.error(error);
        }
    }
    
    // mostrar una materia por id
    public async getMateriaById(req:Request, res:Response): Promise<void> {
        try {
            const sql = MateriasSQL.getMateriasByIdQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql, [req.params.id]);
    
            // valida que la materia exista
            if(result.length == 0) {
                res.status(404).json({ message: "Materia no encontrada" });
                return;
            }
            
            res.status(200).json(result);
    
        } catch (error) {
            res.status(500).json({ message: "Error al buscar la materia" });
        }
    }  
    
    // insertar una materia
    public async postMaterias(req:Request, res:Response): Promise<void> {
        try {
            const {materia, descripcion} = req.body;
            const sql = MateriasSQL.insertMateriasQuery();
            const sql1 = MateriasSQL.getMateriasByNombreQuery();
    
            // valida que la materia no exista
            const [result1] = await pool.query<RowDataPacket[]>(sql1, req.body.materia);
            if (result1.length > 0) {
                res.status(409).json({ message: "La materia ya existe" });
            }
    
            const [result] = await pool.query<RowDataPacket[]>(sql, req.body);
    
            res.status(200).json({ message: "Materia insertada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al insertar la materia" });
        }
    }
    
    // actualizar una materia
    public async putMaterias(req:Request, res:Response): Promise<void> {
        try {
            const {materia, descripcion} = req.body;
            const sql = MateriasSQL.updateMateriasQuery();
            const sql1 = MateriasSQL.getMateriasByMateriaQuery();
            const sql2 = MateriasSQL.getMateriasByIdQuery();
    
            // valida que la materia exista
            const [result2] = await pool.query<RowDataPacket[]>(sql2, req.params.id);
            if (result2.length == 0) {
                res.status(404).json({ message: "Materia no encontrada" });
                return;
            }
            // valida que la materia no este repetida
            const [result1] = await pool.query<RowDataPacket[]>(sql1, [req.body.materia, req.params.id]);
            if (result1.length > 0) {
                res.status(409).json({ message: "La materia ya existe" });
                return;
            }
    
            const [result] = await pool.query<RowDataPacket[]>(sql, [req.body, req.params.id]);
    
            res.status(200).json({ message: "Materia actualizada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar la materia" });
        }
    }
    
    // eliminar una materia
    public async deleteMaterias(req:Request, res:Response): Promise<void> {
        try {
            const sql = MateriasSQL.deleteMateriasQuery();
            const sql1 = MateriasSQL.getMateriasByIdQuery();
    
            // valida que la materia exista
            const [result1] = await pool.query<RowDataPacket[]>(sql1, req.params.id);
            if (result1.length == 0) {
                res.status(404).json({ message: "Materia no encontrada" });
                return;
            }
    
            const [result] = await pool.query<RowDataPacket[]>(sql, req.params.id);
    
            res.status(200).json({ message: "Materia eliminada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la materia" });
        }
    }
}

export default new MateriaController();