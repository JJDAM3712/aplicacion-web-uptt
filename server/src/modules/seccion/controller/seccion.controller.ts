import { Request, Response } from 'express';
import { AppControllerBase } from '../../../controller/app.controller';
import seccionService from '../services/seccion.service';

class SeccionController extends AppControllerBase {
    // mostrar todas las seccion
    public async getController(req:Request, res:Response): Promise<void> {
        try {
            const result = await seccionService.getService();
            res.json(result);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // mostrar seccion id
    public async getControllerById(req:Request, res:Response): Promise<void> {
        try {
            //valida si la seccion
            const result = await seccionService.getServiceById(req.params.id);
            if(result.length === 0) {
                res.status(404).json({message: "Seccion no encontrada"});
                return;
            }
            res.status(200).json(result[0]);
        } catch (error) {
            res.status(500).json({message: "error"});
        }
    }
    // insertar seccion
    public async postController(req:Request, res:Response): Promise<void> {
        try {
            const exist = await seccionService.getServiceExist(req.body.seccion);

            if (exist.length > 0) {
                res.status(409).json({
                    message: "Ya existe esta sección"
                });
                return;
            }

            const result = await seccionService.postService(req.body);

            res.status(200).json({message: "Seccion Registrada Correctamente", data: result});
        } catch (error) {
            console.error(error)
            res.status(500).json({message: error});
        }
    }
    // actualizar seccion
    public async putController(req:Request, res:Response): Promise<void>{
        try {
            // validar que exista la seccion
            const exist = await seccionService.getServiceById(req.params.id);
            if(exist.length === 0) {
                res.status(404).json({message: "Seccion no encontrada"});
                return;
            }
            // validar que no haya secciones repetidas
            const repeat = await seccionService.getServiceRepeat(req.body, req.params.id);
            if (repeat.length > 0) {
                res.status(409).json({ message: "La materia ya existe" });
                return;
            }

            // actualizar seccion
            const result = await seccionService.putService(req.body, req.params.id);

            res.status(200).json({
                messaje: "Seccion actualizada correctamente",
                 data: result
            });
        } catch (error) {
            console.error(error)
            res.status(500).json({message: error});
        }
    }
    // eliminar seccion
    public async deleteController(req:Request, res:Response): Promise<void>{
        try {
            const exist = await seccionService.getServiceById(req.params.id);

            if(exist.length === 0) {
                res.status(404).json({message: "Seccion no encontrada"});
                return;
            }

            const result = await seccionService.deleteService(req.params.id);
            res.status(200).json({
                message: "Seccion eliminanda correctamennte",
                data: result
            });
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
}

export default new SeccionController();