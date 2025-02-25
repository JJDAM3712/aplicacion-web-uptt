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
    // registrar un restudiante
    public async postController(req: Request, res: Response): Promise<void> {
        try {
            // validar que el estudiante no exista
            const exist = await estudianteService.getServiceExist(req.body.cedula, req.params.id);
            if (exist.length > 0) {
                res.status(409).json({message: "Ya existe un estudiante con esta cedula"});
                return;
            }
            // regitra
            const result = await estudianteService.postService(req.body);
            res.status(200).json({result});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    // actualizar estudiantes
    public async putController(req: Request, res: Response): Promise<void> {
        try {
            // validar que el estudiante exista
            const existeID = await estudianteService.getServiceById(req.params.id);
            if (existeID.length === 0) {
                res.status(404).json({message: "El estudiante no existe"});
                return;
            }
            // validar que el estudiante no este repetido
            const repeat = await estudianteService.getServiceRepeat(req.body.cedula, req.params.id);
            if (repeat.length > 0) {
                res.status(409).json({message: "Ya existe un estudiante con esa cedula"});
                return;
            }
            // actualizar
            const result = await estudianteService.putService(req.body, req.params.id);
            res.status(200).json({message: "Estudiante actualizado", data: result});
        } catch (error) {
            res.status(500).json({message:"error al actualizar estudiante", error});
        }
    }
    // borrar estudiantes
    public async deleteController(req: Request, res: Response): Promise<void> {
        try {
            // validar que el estudiante exista
            const exist = await estudianteService.getServiceById(req.params.id);
            if (exist.length === 0) {
                res.status(404).json({message: "El estudiante no existe"});
                return;
            }
            // eliminar
            const result = await estudianteService.deleteService(req.params.id);
            res.status(200).json({message: "Estudiante eliminado existosamente", data: result});
        } catch (error) {
            res.status(500).json({message: "Error al eliminar", data: error})
        }
    }
}

export default new EstudianteController();