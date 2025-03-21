import { ServiceBase } from "../../../services/base.service";
import sessionQuery from "../sql/session.query";
import { hashPass } from "../../../utils/hash";
import { pool } from "../../../database/db";

class SessionService extends ServiceBase {
    async PassGenerateService(clave: string, id: string): Promise<any> {
        const sql = sessionQuery.passGenerateQuery();
        
        // encryptar contraseña
        const hash = await hashPass(clave);
         
        const [result] = await pool.query(sql, [clave, id]);
        return result;
    }
}

export default new SessionService();