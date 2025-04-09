import { Request, Response, NextFunction } from "express";
import sessionService from "../service/session.service";


export const tokenValidate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const authHeader = req.headers['authorization'];
        // Validar si el encabezado de autorización está presente
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: "Token no proporcionado" });
            return;
        }
        // Extraer el token
        const token = authHeader.split(' ')[1];
        // Llamar a la función tokenVerify
        const decoded = await sessionService.validateToken(token);
       // req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        throw new Error("Error en la validación");
    }
}