import userService from "../services/user.service";
import e, { Request, Response } from "express";
import { AppControllerBase } from "../../../controller/app.controller";
import { EnviarMail } from "../../mail/mail";

class UserController extends AppControllerBase {
    // mostrar todos los usuarios
    async getController(req: Request, res: Response): Promise<void> {
        try {
            const result = await userService.getService();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error});
        }
    }
    // mostrar un usuario por id
    async getControllerById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const result = await userService.getServiceById(id);
            // validar si existe el usuario
            if (result.length === 0) {
                res.status(404).json({message: "El usuario no existe"});
                return;
            }
            res.status(200).json(result);  
        } catch (error) {
            res.status(500).json({message:error})
        }
    }
    // registrar un usuarios
    async postController(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;

            // validar que todos los campos existan en el objeto
            if (
                !data.hasOwnProperty("usuario") || 
                !data.hasOwnProperty("email") || 
                !data.hasOwnProperty("clave") ||
                !data.hasOwnProperty("id_rol")
            ) {
                console.error("Hay un campo ausente");
                res.status(400).json({message: "Hay un campo ausente"});
                return;
            }
            // validar que no hayan campos vacios
            if (data.usuario === "" || data.email === "" || data.clave === "" || data.id_rol === "") {
                console.error("Hay un campo vacio");
                res.status(400).json({message: "Hay un campo vacio"});
                return;
            }
            // validar si el json es correcto
            try {
                JSON.stringify(data);
            } catch (error) {
                throw new Error("El json no es correcto");
            }
            // validar si el usuario existe
            const existUser = await userService.getServiceExist(data.usuario, data.email);
            if (existUser.length > 0) {
                if(existUser[0].usuario === data.usuario) {
                    res.status(409).json({message: "Este nombre de usuario ya se encuentra en uso"});
                    return; 
                } else if (existUser[0].email === data.email) {
                    res.status(408).json({message: "Este email ya se encuentra en uso"});
                    return;
                }
            }
            
            const result = await userService.postService(data);
            // enviar correo
            await EnviarMail();

            res.status(200).json({message: "Usuario registrado", result});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: error});
        }
    }
    // actualizar un usuario
    async putController(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;

            // validar que todos los campos existan en el objeto
            if (
                !data.hasOwnProperty("usuario") || 
                !data.hasOwnProperty("email") || 
                !data.hasOwnProperty("clave") ||
                !data.hasOwnProperty("id_rol")
            ) {
                console.error("Hay un campo ausente");
                res.status(400).json({message: "Hay un campo ausente"});
                return;
            }
            // validar que no hayan campos vacios
            if (data.usuario === "" || data.email === "" || data.clave === "" || data.id_rol === "") {
                console.error("Hay un campo vacio");
                res.status(400).json({message: "Hay un campo vacio"});
                return;
            }
            // validar si el json es correcto
            try {
                JSON.stringify(data);
            } catch (error) {
                throw new Error("El json no es correcto");
            }

            // validar si el usuario existe
            const exist = await userService.getServiceById(req.params.id);
            if (exist.length === 0) {
                res.status(404).json({message: "El usuario no existe"});
                return;
            }
            
            // validar si el usuario o email este repetido
            const repeat = await userService.getDataRepeat(data.usuario, data.email, req.params.id);

            if (repeat.length > 0) {
                if(repeat[0].usuario === data.usuario) {
                    res.status(409).json({message: "Este nombre de usuario ya se encuentra en uso"});
                    return; 
                } else if (repeat[0].email === data.email) {
                    res.status(408).json({message: "Este email ya se encuentra en uso"});
                    return;
                }
            }
            
            const result = await userService.putService(data, req.params.id);
            res.status(200).json({message: "Usuario actualizado", result});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: error});
        }
    }
    // eliminar un usuario
    async deleteController(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            
            // validar si el usuario existe
            const exist = await userService.getServiceById(id);
            if (exist.length === 0) {
                res.status(404).json({message: "El usuario no existe"});
                return;
            }

            const result = await userService.deleteService(id);
            res.status(200).json({message: "Usuario eliminado", result});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Error al eliminar el usuario", error});
        }
    }
}

export default new UserController();