import { Request, Response } from "express";
import MensionService from "../services/mension.service"


class MensionController {
    // mostrar todos los datos de las mensiones
    public async getMension(req:Request, res:Response): Promise<void>{
        try {
            const result = await MensionService.getMension();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    
    // mostrar una mension por id
    public async getMensionById(req:Request, res:Response): Promise<void> {
        try {
            const result = await MensionService.getMensionById(req.params.id);
    
            // valida que la mension exista
            if(result.length == 0) {
                res.status(404).json({ message: "Mension no encontrada" });
                return;
            }
            
            res.status(200).json(result);
    
        } catch (error) {
            res.status(500).json({ message: "Error al buscar la mension" });
        }
    }  
    
    // insertar una mension
    public async postMension(req:Request, res:Response): Promise<void> {
        try {
            // valida que la mension no exista
            const result1 = await MensionService.getMensionNombre(req.body.mension, req.params.id);
            if (result1.length > 0) {
                res.status(409).json({ message: "La mension ya existe"});
                return;
            }
            // registra la mension
            const result = await MensionService.postMension(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Error al insertar la mension", data: error });
        }
    }
    
    // actualizar una mension
    public async putMension(req:Request, res:Response): Promise<void> {
        try {
            // valida que la mension exista
            const result2 = await MensionService.getMensionById(req.params.id);
            if (result2.length == 0) {
                res.status(404).json({ message: "Mension no encontrada" });
                return;
            }
            // valida que la mension no este repetida
            const result1 = await MensionService.getMensionRepetida(req.body.mension, req.params.id);
            if (result1.length > 0) {
                res.status(409).json({ message: "La mension ya existe" });
                return;
            }
            // actualiza la materia
            const result = await MensionService.putMension(req.body, req.params.id);
    
            res.status(200).json({ message: "Mension actualizada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar la mension" });
        }
    }
    
    // eliminar una mension
    public async deleteMension(req:Request, res:Response): Promise<void> {
        try {    
            // valida que la mension exista
            const result1 = await MensionService.getMensionById(req.params.id);
            if (result1.length == 0) {
                res.status(404).json({ message: "Mension no encontrada" });
                return;
            }
            // elimina la mension
            const result = await MensionService.deleteMension(req.params.id);
    
            res.status(200).json({ message: "Mension eliminada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la mension" });
        }
    }
}

export default new MensionController();