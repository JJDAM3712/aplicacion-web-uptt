import { Response, Request, NextFunction } from "express";
import { AppControllerBase } from "../../../controller/app.controller";
import sessionService from "../service/session.service";
import { randomPassword } from "../../../utils/generate.pass";
import userService from "../../usuarios/services/user.service";
import { EnviarMail } from "../../mail/mail";
import bcrypt from "bcryptjs";

class SessionController extends AppControllerBase {
    // generar contraseña de usuario
    async passGenerateController(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            // generar la contraseña
            let clave = randomPassword();

            console.log(clave);
            // validar si la contraseña esta dublicada
            const passDuplicate = await sessionService.PassDuplicateService(clave);
            // si existe una contraseña igual genera otra automaticamente
            if (passDuplicate.length > 0) {
                clave = randomPassword();
            }
            // obtiene los datos del usuario
            const datos = await userService.getServiceById(id);
            if (datos.length === 0) {
                res.status(404).json({message: "El usuario no existe"});
                return;
            }
          
            const data = datos[0]
            console.log(data);
            // envia el email con los datos
            const info = await EnviarMail(data);
            console.log(`Email enviado exitosamente: ${info.messageId}`);

            
            const result = await sessionService.PassGenerateService(clave, id);

            res.status(200).json({message: "contraseña generada exitosamente!", result});

        } catch(error) {
            console.log(error)
            res.status(500).json({message: "Errror al generar la contraseña", error})
        }
    }
    // autenticacion de login
    async autenticateController(req: Request, res: Response): Promise<void> {
        try {
            const {cedula, clave} = req.body;

            // validar si los datos vienen vacios
            if (cedula == "" || clave == "") {
                res.status(409).json({
                    message: "Falta algún dato"
                });
                return;
            }

            const result = await sessionService.loginService(cedula);
            // valida si el usuario existe
            if (result.length === 0) {
                res.status(404).json({
                    message: "Usuario o contraseña incorrecto"
                });
                return;
            }
            
            // valida si la contraseña es correcta
            const match = await bcrypt.compare(clave, result[0].clave);
            if (!match) {
                res.status(404).json({mensaje: "usuario o contraseña incorrecto"});
                return;
            }
            const token = await sessionService.tokenGenerate(result[0].id_usuario, result[0].id_rol);
            console.log(token)
            // exito si todo es valido
            res.status(200).json({
                message: "Login exitoso!",
                result: result
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Error al autenticar el usuario",
                error: error
            })
        }
    }
    // comprobar token
    async autenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
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
            req.user = decoded;
            next();
            res.status(200).json({ message: "Acceso permitido", data: decoded });
        } catch (error) {
            res.status(401).json({message: "token invalido"})
        }
    }
    
}

export default new SessionController();
