import { Request, Response } from "express";
import AnnoService from "../services/anno.service"
import { AppControllerBase } from "../../../controller/app.controller";


class AnnoController extends AppControllerBase{
    // mostrar todos los datos de las años
    public async getController(req:Request, res:Response): Promise<void>{
        try {

            const result = await AnnoService.getService();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    
    // mostrar una año por id
    public async getControllerById(req:Request, res:Response): Promise<void> {
        try {
            const result = await AnnoService.getServiceById(req.params.id);
    
            // valida que la año exista
            if(result.length == 0) {
                res.status(404).json({ message: "Año no encontrada" });
                return;
            }
            
            res.status(200).json(result);
    
        } catch (error) {
            res.status(500).json({ message: "Error al buscar la año" });
        }
    } 
} 
    

export default new AnnoController();