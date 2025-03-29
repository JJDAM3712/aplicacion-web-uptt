import { Request, Response } from "express";

// interfaz de los controladores
export interface AppController {
    getController(req: Request, res:Response): Promise<void>;
    getControllerById(req: Request, res:Response): Promise<void>;
    postController(req: Request, res:Response): Promise<void>;
    putController(req: Request, res:Response): Promise<void>;
    deleteController(req: Request, res:Response): Promise<void>;
}

// clase padre de los controladores
export class AppControllerBase implements AppController {
    // mostrar todos los datos
    public async getController(req: Request, res: Response): Promise<void> {
        res.status(501).json({ message: "Not Implemented" });
    }
    // mostrar un dato por id
    public async getControllerById(req: Request, res: Response): Promise<void> {
        res.status(501).json({ message: "Not Implemented" });
    }
    // innsertar un dato
    public async postController(req: Request, res: Response): Promise<void> {
        res.status(501).json({ message: "Not Implemented" });
    }
    // actualizar un dato
    public async putController(req: Request, res: Response): Promise<void> {
        res.status(501).json({ message: "Not Implemented" });
    }
    // eliminar un dato
    public async deleteController(req: Request, res: Response): Promise<void> {
        res.status(501).json({ message: "Not Implemented" });
    }
}
