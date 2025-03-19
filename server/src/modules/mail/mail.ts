import nodemailer, {Transporter} from 'nodemailer';
import dotenv from 'dotenv';
import { getDirname } from '../../utils/dirname';

const __dirname = getDirname(import.meta.url);
dotenv.config({ path: `${__dirname}/../../../.env` });

const createTransporter = (): Transporter => {
    return nodemailer.createTransport({
        host: process.env.HOST_MAIL,
        port: process.env.PORT_MAIL,
        secure: true,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASS_MAIL,
        },
    });
} 

// async..await is not allowed in global scope, must use a wrapper
export const EnviarMail = async (): Promise<any> => {
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail({
            from: '"TEST" <jjason3712@gmail.com>', // sender address
            to: "u56963cqkb@jxpomup.com", // list of receivers
            subject: "Hello test!!",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });
        
        console.log("Message sent: %s", info.response);
    } catch (error) {
        console.error(error);
        throw new Error("Error al enviar el correo");
    }
}
 