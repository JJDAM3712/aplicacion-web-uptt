import  ProfesorService from "../service/profesor.service";
import { Request, Response } from "express";
import { AppControllerBase } from "../../../controller/app.controller";
import userService from "../../usuarios/services/user.service";
import { io } from "../../../app";


class ProfesorController extends AppControllerBase {
    // mostrar todos los profesores
    public async getProfController(req: Request, res: Response): Promise<void> {
        try {
            const result = await ProfesorService.getProfService();
            
            io.emit("ActualizarTable", result)

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: "error al mostrar los profesores"});
        }
    }
    // mostrar profesores por id
    public async getProfControllerById(req: Request, res: Response): Promise<void> {
        try {
            const result = await ProfesorService.getProfServiceById(req.params.id);
            if (result.length === 0){
                res.status(404).json({message: "El profesor no existe"});
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: "Error al mostrar al profesor", data: error});
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
    // borrar profesor
    public async deleteController(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            // validar que el profesor exista
            const exist = await ProfesorService.getServiceById(id);
            
            if (exist.length === 0) {
                res.status(404).json({ message: "El profesor no existe"});
                return
            }
            // cambiar prof a null en tabla clases
            await ProfesorService.profNullClaseService(id);

            // borrar
            const result = await userService.deleteService(id);

            res.status(200).json({ message: "Profesor borrado", result});
        } catch (error) {
            res.status(500).json({ message: "Error al borrar el profesor", error });
        }
    }

    // --- controladores de clases --- //
    // mostrar todos los profesores con sus clases
    public async getController(req: Request, res: Response): Promise<void> {
        try {
            const result = await ProfesorService.getService();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    // mostrar profesor y clases por id
    public async getControllerById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const result = await ProfesorService.getServiceById(id);
            
            // validar si el profesor existe
            if (result.length === 0) {
                res.status(404).json({ message: "El profesor no existe" });
                return;
            }
            if (result[0].id_rol != 2) {
                res.status(404).json({ message: "El usuario no es profesor" });
                return;  
            }
            
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error });
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
            // validar que la clase no la de otro prof
            const otherProfClass = await ProfesorService.claseOtherProfService(req.body);
            if (otherProfClass[0].length > 0) {
                res.status(408).json({message: "Esta clase ya se encuentra asignada a otro profesor"});
                return;
            }
            // registrar la clase
            const result = await ProfesorService.postClaseService(req.body);

            res.status(200).json({message: "Clase registrada", result});
        } catch (error) {
            res.status(500).json({ message: "error al registrar el profesor", error}); 
        }
    }
    // actualizar una clase
    public async putController(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const id = req.params.id;

            // validar que la clase exista
            const exist = await ProfesorService.getClaseByService(id);
            if (exist.length === 0) {
                res.status(404).json({ message: "La clase no existe "});
                return
            }
            // validar que la clase no este repetida
            const repeat = await ProfesorService.classExistService(data, id);
            if (repeat.length >= 1) {
                res.status(409).json({
                    message: "Ya otro profesor da esta clase"
                });
                return;
            }

            const result = await ProfesorService.putService(data, id);

            res.status(200).json({
                message: "Clase actualizada exitosamente",
                result: result
            })
        } catch (error) {
            res.status(500).json({
                message: "error al actualizar la clase",
                data: error
            })
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

            const result = await ProfesorService.deleteClaseService(req.params.id);

            res.status(200).json({
                message: "Clase eliminada",
                data: result
            });
        } catch (error) {
            res.status(500).json({ message: "error al eliminar la clase", error}); 
        }
    }
    // filtro de clases
    public async filterClassController(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            const materias = await ProfesorService.filterMateriaService(id);
            const menciones = await ProfesorService.filterMencionService(id);
            const anio = await ProfesorService.filterAnioService(id);
            const secciones = await ProfesorService.filteSeccionService(id);

            res.status(200).json({
                materias,
                menciones,
                anio,
                secciones
            })
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener la clase",
                error: error
            })
        }
    }
}

export default new ProfesorController();