import nodemailer, {Transporter} from 'nodemailer';
import dotenv from 'dotenv';
import { getDirname } from '../../utils/dirname';

const __dirname = getDirname(import.meta.url);
dotenv.config({ path: `${__dirname}/../../../.env` });




const createTransporter = (): Transporter => {
    return nodemailer.createTransport({
        host: process.env.HOST_MAIL,
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASS_MAIL,
        },
    });
} 

// async..await is not allowed in global scope, must use a wrapper
export const EnviarMail = async (data: any): Promise<any> => {
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail({
            from: `TEST ${process.env.USER_MAIL}`, // sender address
            to: data.email, // list of receivers
            subject: `${data.p_nombre} ${data.p_apellido}`,
            text: "Este es un correo de prueba",
            html: "<h1 style='color: red'>Probando correo con APÏ</h1>",
        });
        
        console.log("Message sent: %s", info.response);
    } catch (error) {
        console.error(error);
        throw new Error("Error al enviar el correo");
    }
}
 