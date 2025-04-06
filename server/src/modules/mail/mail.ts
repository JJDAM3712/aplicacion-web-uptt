import nodemailer, {Transporter} from 'nodemailer';
import dotenv from 'dotenv';
import { getDirname } from '../../utils/dirname';

const __dirname = getDirname(import.meta.url);
dotenv.config({ path: `${__dirname}/../../../.env` });

const host: string | undefined = process.env.HOST_MAIL;
const mail: string | undefined = process.env.USER_MAIL;
const pass: string | undefined = process.env.PASS_MAIL;

if (!host || !mail || !pass) {
    throw new Error("Variables de entorno vacias")
}

// conexion con el servidor smtp/gmail
const createTransporter = (): Transporter => {
    return nodemailer.createTransport({
        host: host,
        port: 465,
        secure: true,
        auth: {
            user: mail,
            pass: pass,
        },
    });
} 

// enviar email
export const EnviarMail = async (data: any): Promise<any> => {
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail({
            // correo de origen
            from: `TEST ${mail}`,
            // correo destino
            to: data.email,
            // nombre del mensajero
            subject: `Liceo Etanislao Carrillo`,
            // asunto
            text: `${data.p_nombre} ${data.p_apellido}`,
            // texto
            html: `<h2>Datos de sesion</h2>
                   <p>
                       Los datos de inicio de sesión del alumno
                       ${data.p_nombre} ${data.p_apellido}.
                       <br>
                       usuario: <b>${data.cedula}</b>
                       contraseña: <b>${data.clave}</b>
                   </p>`,
        });
        return info;
    } catch (error) {
        console.error(error);
        throw new Error("Error al enviar el correo");
    }
}
 