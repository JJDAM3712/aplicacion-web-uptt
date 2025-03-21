import { Response, Request } from "express";
import { AppControllerBase } from "../../../controller/app.controller";
import sessionService from "../service/session.service";
import { randomPassword } from "../../../utils/generate.pass";

class SessionController extends AppControllerBase {
    async passGenerateController(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            
            const clave = randomPassword();

            console.log(clave);

            const result = await sessionService.PassGenerateService(clave, id);

            res.status(200).json({message: "contraseña generada exitosamente!", result});

        } catch(error) {
            console.log(error)
            res.status(500).json({message: "Errror al generar la contraseña", error})
        }
    }
}

export default new SessionController();
