import { Request, Response } from "express";
import { AppControllerBase } from "../../../controller/app.controller";
import lapsoService from "../services/lapso.service";

class LapsoController extends AppControllerBase {
    // mostrar todos los lapsos
    async getController(req: Request, res: Response): Promise<void> {
        try {
            const result = await lapsoService.getService();
            res.status(200).json({result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    async getControllerById(req: Request, res: Response): Promise<void> {
        try {
            const result = await lapsoService.getServiceById(req.params.id);
            // validar que exista el lapso
            if (result.length === 0) {
                res.status(404).json({message: "El lapso no existe"});
                return;
            }
            res.status(200).json({result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
}

export default new LapsoController();