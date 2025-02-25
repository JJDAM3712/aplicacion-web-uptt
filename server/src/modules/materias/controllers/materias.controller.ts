import { Request, Response } from "express";
import MateriaService from "../services/materias.service"
import { AppControllerBase } from "../../../controller/app.controller";


class MateriaController extends AppControllerBase{
    // mostrar todos los datos de las materias
    public async getController(req:Request, res:Response): Promise<void>{
        try {
            const result = await MateriaService.getService();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    
    // mostrar una materia por id
    public async getControllerById(req:Request, res:Response): Promise<void> {
        try {
            const result = await MateriaService.getServiceById(req.params.id);
    
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
    public async postController(req:Request, res:Response): Promise<void> {
        try {
            // valida que la materia no exista
            const result1 = await MateriaService.getServiceExist(req.body.materia, req.params.id);
            if (result1.length > 0) {
                res.status(409).json({ message: "La materia ya existe"});
                return;
            }
            // registra la materia
            const result = await MateriaService.postService(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Error al insertar la materia", data: error });
        }
    }
    
    // actualizar una materia
    public async putController(req:Request, res:Response): Promise<void> {
        try {
            // valida que la materia exista
            const result2 = await MateriaService.getServiceById(req.params.id);
            if (result2.length == 0) {
                res.status(404).json({ message: "Materia no encontrada" });
                return;
            }
            // valida que la materia no este repetida
            const result1 = await MateriaService.getServiceRepeat(req.body.materia, req.params.id);
            if (result1.length > 0) {
                res.status(409).json({ message: "La materia ya existe" });
                return;
            }
            // actualiza la materia
            const result = await MateriaService.putService(req.body, req.params.id);
    
            res.status(200).json({ message: "Materia actualizada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar la materia" });
        }
    }
    
    // eliminar una materia
    public async deleteController(req:Request, res:Response): Promise<void> {
        try {    
            // valida que la materia exista
            const result1 = await MateriaService.getServiceById(req.params.id);
            if (result1.length == 0) {
                res.status(404).json({ message: "Materia no encontrada" });
                return;
            }
            // elimina la materia
            const result = await MateriaService.deleteService(req.params.id);
    
            res.status(200).json({ message: "Materia eliminada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la materia" });
        }
    }
}

export default new MateriaController();