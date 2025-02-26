import { pool } from '../../../database/db';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import NotasSQL from '../sql/notas';
import { AppControllerBase } from '../../../controller/app.controller';
import NotasService from '../services/notas.service';

class NotasController extends AppControllerBase {
    // mostrar todas las notas
    public async getController(req:Request, res:Response): Promise<void> {
        try {
            const result = await NotasService.getService();
            res.json(result);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // mostrar nota por id
    public async getControllerById(req:Request, res:Response): Promise<void> {
        try {
            //valida si la nota existe
            const result = await NotasService.getServiceById(req.params.id) as RowDataPacket[];

            if(result.length == 0) {
                res.status(404).json({message: "Nota no encontrada"});
                return;
            }

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: "error"});
        }
    }
    // insertar nota
    public async postController(req:Request, res:Response): Promise<void> {
        try {
            const result = await NotasService.postService(req.body);
            res.status(200).json({message: "Nota registrada correctamente", data: result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // actualizar notas
    public async putController(req:Request, res:Response): Promise<void> {
        try {
            //valida si la nota existe
            const validacion = await NotasService.getServiceById(req.params.id) as RowDataPacket[];

            if(validacion.length == 0) {
                res.status(404).json({message: "Nota no encontrada"});
                return;
            }
            // actualiza la nota
            const result = await NotasService.putService(req.body, req.params.id);

            res.status(200).json({messaje: "Nota actualizada Correctamente", data: result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // eliminar notas
    public async deleteController(req:Request, res:Response) : Promise<void>{
        try {
            //valida si la nota existe
            const validacion = await NotasService.getServiceById(req.params.id) as RowDataPacket[];

            if(validacion.length == 0) {
                res.status(404).json({message: "Nota no encontrada"});
                return;
            }
            const result = await NotasService.deleteService(req.params.id);
            res.status(200).json({message: "Nota eliminada correctamente", data: result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
}

export default new NotasController();