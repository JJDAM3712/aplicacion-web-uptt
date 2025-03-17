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
            res.status(200).json(result);  
        } catch (error) {
            res.status(500).json({message:error})
        }
    }
    // registrar un usuarios
    async postController(req: Request, res: Response): Promise<void> {
        try {
            const result = await userService.postService(req.body);
            res.status(200).json({message: "Usuario registrado", result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // actualizar un usuario
    async putController(req: Request, res: Response): Promise<void> {
        try {
            const result = await userService.putService(req.body, req.params.id);
            res.status(200).json({message: "Usuario actualizado", result});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
}

export default new UserController();