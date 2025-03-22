import { ServiceBase } from "../../../services/base.service";
import sessionQuery from "../sql/session.query";
import { hashPass } from "../../../utils/hash";
import { pool } from "../../../database/db";

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
}

export default new SessionService();