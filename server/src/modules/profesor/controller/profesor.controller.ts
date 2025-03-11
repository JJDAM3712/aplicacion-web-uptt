import  ProfesorService from "../service/profesor.service";
import { Request, Response } from "express";
import { AppControllerBase } from "../../../controller/app.controller";
import { json } from "stream/consumers";

class ProfesorController extends AppControllerBase {
    // mostrar todos los profesores
    public async getController(req: Request, res: Response): Promise<void> {
        try {
            const result = await ProfesorService.getService();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    // mostrar profesor por id
    public async getControllerById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const result = await ProfesorService.getServiceById(id);
            
            // validar si el profesor existe
            if (result.length === 0) {
                res.status(404).json({ message: "El profesor no existe" });
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    // registrar profesor
    public async postController(req: Request, res: Response): Promise<void> {
        try {
            // validar que el profesor no exista
            const exist = await ProfesorService.getServiceExist(req.body.cedula, req.params.id);
            
            if (exist.length > 0) {
                res.status(409).json({ message: "Ya existe un profesor con esta cedula"});
                return;
            }
            // registrar
            const result = await ProfesorService.postService(req.body);
            res.status(200).json({message: "profesor registrado", result})

        } catch (error) {
            res.status(500).json({ message: "error al registrar el profesor", error});
        }
    }
    // actualizar profesor
    public async putController(req: Request, res: Response): Promise<void> {
        try {
            // validar que el profesor exista
            const exist = await ProfesorService.getServiceById(req.params.id);
            if (exist.length === 0) {
                res.status(404).json({ message: "El profesor no existe "});
                return
            }
            // validar que el profesor no este repetido
            const repeat = await ProfesorService.getServiceRepeat(req.body.cedula, req.params.id);
            if (repeat.length > 0) {
                res.status(409).json({ message: "Ya existe un profesor con esta cedula "});
                return;
            }
            // actualizar
            const result = await ProfesorService.putService(req.body, req.params.id);
            res.status(200).json({ message: "profesor actualizado", result});
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el profesor", error});
        }
    }
    // borrar profesor
    public async deleteController(req: Request, res: Response): Promise<void> {
        try {
            // validar que el profesor exista
            const exist = await ProfesorService.getServiceById(req.params.id);
            
            if (exist.length === 0) {
                res.status(404).json({ message: "El profesor no existe "});
                return
            }
            // borrar
            const result = await ProfesorService.deleteService(req.params.id);
            res.status(200).json({ message: "Profesor borrado", result});
        } catch (error) {
            res.status(500).json({ message: "Error al borrar el profesor", error });
        }
    }
}

export default new ProfesorController();