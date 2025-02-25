import estudianteService from "../services/estudiante.service";
import { AppControllerBase } from "../../../controller/app.controller";
import { Request, Response } from "express";

// controladores de estudiantes
class EstudianteController extends AppControllerBase {
    // mostrar todos los estudiantes
    public async getController(req: Request, res: Response): Promise<void> {
        try {
            const result = await estudianteService.getService();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // mostrar un estudiante por id
    public async getControllerById(req: Request, res: Response): Promise<void> {
        try {
            const result = await estudianteService.getServiceById(req.params.id);
            
            // valida si existe el estudiante
            if (result.length === 0) {
                res.status(404).json({mensaje: "El estudiante no existe"});
                return;
            }
            res.status(200).json({result})
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new EstudianteController();