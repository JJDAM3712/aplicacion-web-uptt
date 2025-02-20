import { Request, Response } from "express";
import MateriaService from "../services/materias.service"


class MateriaController {
    // mostrar todos los datos de las materias
    public async getMaterias(req:Request, res:Response): Promise<void>{
        try {
            const result = await MateriaService.getMaterias();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    
    // mostrar una materia por id
    public async getMateriaById(req:Request, res:Response): Promise<void> {
        try {
            const result = await MateriaService.getMateriaById(req.params.id);
    
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
            // valida que la materia no exista
            const result1 = await MateriaService.getMateriasNombre(req.body.materia, req.params.id);
            if (result1.length > 0) {
                res.status(409).json({ message: "La materia ya existe"});
                return;
            }
            // registra la materia
            const result = await MateriaService.postMaterias(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Error al insertar la materia", data: error });
        }
    }
    
    // actualizar una materia
    public async putMaterias(req:Request, res:Response): Promise<void> {
        try {
            // valida que la materia exista
            const result2 = await MateriaService.getMateriaById(req.params.id);
            if (result2.length == 0) {
                res.status(404).json({ message: "Materia no encontrada" });
                return;
            }
            // valida que la materia no este repetida
            const result1 = await MateriaService.getMateriasRepetida(req.body.materia, req.params.id);
            if (result1.length > 0) {
                res.status(409).json({ message: "La materia ya existe" });
                return;
            }
            // actualiza la materia
            const result = await MateriaService.putMaterias(req.body, req.params.id);
    
            res.status(200).json({ message: "Materia actualizada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar la materia" });
        }
    }
    
    // eliminar una materia
    public async deleteMaterias(req:Request, res:Response): Promise<void> {
        try {    
            // valida que la materia exista
            const result1 = await MateriaService.getMateriaById(req.params.id);
            if (result1.length == 0) {
                res.status(404).json({ message: "Materia no encontrada" });
                return;
            }
            // elimina la materia
            const result = await MateriaService.deleteMaterias(req.params.id);
    
            res.status(200).json({ message: "Materia eliminada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la materia" });
        }
    }
}

export default new MateriaController();