import { Request, Response } from "express";
import EvaluacionService from "../services/evaluacion.service";
import { AppControllerBase } from "../../../controller/app.controller";
import { io } from "../../../app";


class EvaluacionController extends AppControllerBase{
    // mostrar todos los datos de las evaluaciones
    public async getController(req:Request, res:Response): Promise<void>{
        try {
            const evaluaciones = await EvaluacionService.getService();
            io.emit('ActualizarTable', evaluaciones);
            console.log("Evento emitido: ActualizarTable", evaluaciones);
            res.status(200).json(evaluaciones);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    
    // mostrar una evaluacion por id
    public async getControllerById(req:Request, res:Response): Promise<void> {
        try {
            const result = await EvaluacionService.getServiceById(req.params.id);
    
            // valida que la evaluacion exista
            if(result.length == 0) {
                res.status(404).json({ message: "Evaluacion no encontrada" });
                return;
            }
            
            res.status(200).json(result);
    
        } catch (error) {
            res.status(500).json({ message: "Error al buscar la Evaluacion" });
        }
    }  
    
    // insertar una evalaucion
    public async postController(req:Request, res:Response): Promise<void> {
        try {
            // valida que la evaluacion no exista
            const result1 = await EvaluacionService.getServiceExist(req.body.materia);
            if (result1.length > 0) {
                res.status(409).json({ message: "La evaluacion ya existe"});
                return;
            }
            // registra la evaluacion
            const result = await EvaluacionService.postService(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Error al insertar la evaluacion", data: error });
        }
    }
    
    // actualizar una evaluacion
    public async putController(req:Request, res:Response): Promise<void> {
        try {
            // valida que la evaluacion exista
            const result2 = await EvaluacionService.getServiceById(req.params.id);
            if (result2.length == 0) {
                res.status(404).json({ message: "Evaluacion no encontrada" });
                return;
            }
            // valida que la evaluacin no este repetida
            const result1 = await EvaluacionService.getServiceRepeat(req.body.evaluacin, req.params.id);
            if (result1.length > 0) {
                res.status(409).json({ message: "La evaluacion ya existe" });
                return;
            }
            // actualiza la evaluacion
            const evaluaciones = await EvaluacionService.putService(req.body, req.params.id);

            res.status(200).json({ message: "Evaluacion actualizada correctamente" , data: evaluaciones });
        }
        catch (error) {
            console.log("ERROR ACTUALIZAR = ",error)
            res.status(500).json({ message: "Error al actualizar la evaluacion" });
        }
    }
    
    // eliminar una evaluacion
    public async deleteController(req:Request, res:Response): Promise<void> {
        try {    
            // valida que la evaluacion exista
            const result1 = await EvaluacionService.getServiceById(req.params.id);
            if (result1.length == 0) {
                res.status(404).json({ message: "Evaluacion no encontrada" });
                return;
            }
            // elimina la evaluacion
            const result = await EvaluacionService.deleteService(req.params.id);
    
            res.status(200).json({ message: "Evaluacion eliminada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la materia" });
        }
    }
}

export default new EvaluacionController();