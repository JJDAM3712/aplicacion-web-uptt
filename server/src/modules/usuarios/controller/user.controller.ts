import userService from "../services/user.service";
import e, { Request, Response } from "express";
import { AppControllerBase } from "../../../controller/app.controller";
import bcrypt from "bcryptjs";

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
            const existUser = await userService.getServiceExist(data.usuario, req.params.id);
            if (existUser.length > 0) {
                res.status(409).json({message: "Ya existe un usuario con ese nombre"});
                return;
            }
            // validar si el email existe
            const existEmail = await userService.getServiceEmailExist(data.email, req.params.id);
            if (existEmail.length > 0) {
                res.status(408).json({message: "Este email ya se encuentra registrado"});
                return;
            }

            const result = await userService.postService(data);
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
            
            // validar si el usuario y email este repetido

            const repeat = await userService.getDataRepeat(data.usuario, data.email, req.params.id);
            if (repeat.length > 0) {
                res.status(409).json({message: "Este nombre de usuario y/o email ya se encuentra en uso"});
                return;
            }
            
            const result = await userService.putService(data, req.params.id);
            res.status(200).json({message: "Usuario actualizado", result});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: error});
        }
    }
}

export default new UserController();