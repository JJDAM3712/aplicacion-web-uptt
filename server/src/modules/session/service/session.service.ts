import { ServiceBase } from "../../../services/base.service";
import sessionQuery from "../sql/session.query";
import { hashPass } from "../../../utils/hash";
import { pool } from "../../../database/db";
import jwt from 'jsonwebtoken';
import { getDirname } from "../../../utils/dirname";
import dotenv from 'dotenv';

// configuracion de dirname
const __dirname = getDirname(import.meta.url);
dotenv.config({ path: `${__dirname}/../../../../.env` });


class SessionService extends ServiceBase {
    // almacenar contraseña
    async PassGenerateService(clave: string, id: string): Promise<any> {
        const sql = sessionQuery.passGenerateQuery();
        
        // encryptar contraseña
        const hash = await hashPass(clave);
         
        const [result] = await pool.query(sql, [hash, id]);
        return result;
    }
    // buscar contraseña duplicada
    async PassDuplicateService(clave: string): Promise<any> {
        const sql = sessionQuery.passDuplicateQuery();

        const [result] = await pool.query(sql, clave);
        return result;
    }
    // hacer login
    async loginService(data: string): Promise<any> {
        const sql = sessionQuery.loginDateQuery();

        const [result] = await pool.query(sql, data);

        return result;
    }
    // generar token
    async tokenGenerate(id: string, rol:string): Promise<any> {
        try {
            // Crea el payload con los datos del usuario
            const payload: object = { id: id, rol: rol };
            // contraseña secreta
            const secret: any = process.env.TOKEN_SECRET;
            // duracion del token
            const options: object = { expiresIn: "1h" };
            // genera el token
            const token: string = jwt.sign(payload, secret, options);
            
            return token;

        } catch (error) {
            console.error(error);
            throw new Error("error al generar el token");
        }
    }
    // comprobar el token
    async validateToken(token: string): Promise<any> {
        try {
            const secret: any = process.env.TOKEN_SECRET;
            const result  = jwt.verify(token, secret);
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Error al comprobar el token")
        }
    }
}

export default new SessionService();