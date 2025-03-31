import { Request, Response } from "express";
import MencionService from "../services/mencion.service"
import { AppControllerBase } from "../../../controller/app.controller";


class MencionController extends AppControllerBase{
    // mostrar todos los datos de las menciones
    public async getController(req:Request, res:Response): Promise<void>{
        try {

            const result = await MencionService.getService();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    
    // mostrar una mencion por id
    public async getControllerById(req:Request, res:Response): Promise<void> {
        try {
            const result = await MencionService.getServiceById(req.params.id);
    
            // valida que la mencion exista
            if(result.length == 0) {
                res.status(404).json({ message: "Mencion no encontrada" });
                return;
            }
            
            res.status(200).json(result);
    
        } catch (error) {
            res.status(500).json({ message: "Error al buscar la mencion" });
        }
    }  
    
    // insertar una mencion
    public async postController(req:Request, res:Response): Promise<void> {
        try {
            // valida que la mencion no exista
            const result1 = await MencionService.getServiceExist(req.body.mencion, req.params.id);
            if (result1.length > 0) {
                res.status(409).json({ message: "La mencion ya existe"});
                return;
            }
            // registra la mencion
            const result = await MencionService.postService(req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Error al insertar la mencion", data: error });
        }
    }
    
    // actualizar una mencion
    public async putController(req:Request, res:Response): Promise<void> {
        try {
            // valida que la mencion exista
            const result2 = await MencionService.getServiceById(req.params.id);
            if (result2.length == 0) {
                res.status(404).json({ message: "Mencion no encontrada" });
                return;
            }
            // valida que la mencion no este repetida
            const result1 = await MencionService.getServiceRepeat(req.body.mencion, req.params.id);
            if (result1.length > 0) {
                res.status(409).json({ message: "La mencion ya existe" });
                return;
            }
            // actualiza la mencion
            const result = await MencionService.putService(req.body, req.params.id);
    
            res.status(200).json({ message: "Mencion actualizada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar la mencion" });
        }
    }
    
    // eliminar una mencion
    public async deleteController(req:Request, res:Response): Promise<void> {
        try {    
            // valida que la mencion exista
            const result1 = await MencionService.getServiceById(req.params.id);
            if (result1.length == 0) {
                res.status(404).json({ message: "Mencion no encontrada" });
                return;
            }
            // elimina la mencion
            const result = await MencionService.deleteService(req.params.id);
    
            res.status(200).json({ message: "Mencion eliminada correctamente" , data: result });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la mencion" });
        }
    }
}

export default new MencionController();