import { Response, Request } from "express";
import { AppControllerBase } from "../../../controller/app.controller";
import sessionService from "../service/session.service";
import { randomPassword } from "../../../utils/generate.pass";
import userService from "../../usuarios/services/user.service";
import { EnviarMail } from "../../mail/mail";

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

            
            const result = await sessionService.PassGenerateService("12345", id);

            res.status(200).json({message: "contraseña generada exitosamente!", result});

        } catch(error) {
            console.log(error)
            res.status(500).json({message: "Errror al generar la contraseña", error})
        }
    }
    // autenticacion de login
    // autenticar usuario / login
    async AuthenticLogin(req: Request, res: Response) => {
        try {
            // recibe datos del servidor
            const datos = req.body;
            // Verifica las credenciales contra el usuario predeterminado
            if (usuario === DefaultUser.usuario && password === DefaultUser.password) {
                const token = generateToken(DefaultUser.id);
                res.cookie('access_token', token, {
                    httpOnly: true,
                });
                return res.status(200).json({ mensaje: 'Inicio de sesión exitoso para el usuario predeterminado.' });
            }
            let result;
            try {
                result = await BuscarUser(usuario);
            } catch (error) {
                if (error.message === "usuario incorrecto") {
                    return res.status(401).json({mensaje: "usuario o contraseña incorrecto"});
                } else {
                    throw error;
                }
            }
            // compara la contraseña con el hash almacenado en la base de datos
            const match = await bcrypt.compare(password, result[0].password);
            if (!match) {
                return res.status(401).json({mensaje: "usuario o contraseña incorrecto"})
            }
            // Después de verificar la contraseña
            const userId = result[0].id; // Obtén el ID del usuario desde result
            const token = generateToken(userId);
            // Configura el token en una cookie
            res.cookie('access_token', token, {
                httpOnly: true,
            });
            // muestra el resultado
            return res.status(200).json({ mensaje: "Inicio de sesión exitoso" });
        } catch (error) {
            return res.status(500).json({mensaje: error.message});
        }
    }
}

export default new SessionController();
