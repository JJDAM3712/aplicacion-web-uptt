import  ProfesorService from "../service/profesor.service";
import { Request, Response } from "express";
import { AppControllerBase } from "../../../controller/app.controller";
import userService from "../../usuarios/services/user.service";


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
            const data = req.body;

            // validar si el json es correcto
            try {
                JSON.stringify(data);
            } catch (error) {
                throw new Error("El json no es correcto");
            }
            // validar si el usuario existe
            const existUser = await userService.getUserServiceExist(data.cedula, data.email);
            if (existUser.length > 0) {
                if(existUser[0].cedula === data.cedula) {
                    res.status(409).json({message: "Esta cedula ya se encuentra registrada"});
                    return; 
                } else if (existUser[0].email === data.email) {
                    res.status(408).json({message: "Este email ya se encuentra registrada"});
                    return;
                }
            }
            // asigna el rol del profesor
            data.id_rol = 2;
            
            // registra al profesor
            const result = await userService.postService(req.body);

            res.status(200).json({message: "Profesor registrado", result});
        } catch (error) {
            res.status(500).json({ message: "error al registrar el profesor", error});
        }
    }
    // registrar clase del profesor
    public async postClaseController(req: Request, res: Response): Promise<void> {
        try {
            // validar que la clase no exista
            const exist = await ProfesorService.getServiceExist(req.body);
            if (exist.length > 0) {
                res.status(409).json({message: "Esta clase ya se encuentra registrada"});
                return; 
            }

            const result = await ProfesorService.postClaseService(req.body);

            res.status(200).json({message: "Clase registrada", result});
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
    // borrar clase
    public async deleteClaseController(req: Request, res: Response): Promise<void> {
        try {
            // validar que la clase exista
            const exist = await ProfesorService.getClaseByService(req.params.id);
            if (exist.length === 0) {
                res.status(404).json({ message: "La clase no existe "});
                return
            }

            const result = await 
            res.status(200).json({
                message: "Clase eliminada",
                data: exist
            });
        } catch (error) {
            res.status(500).json({ message: "error al eliminar la clase", error}); 
        }
    }
}

export default new ProfesorController();