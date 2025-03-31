import { pool } from "../../../database/db";
import { ServiceBase } from "../../../services/base.service";
import { RowDataPacket } from "mysql2";
import AnnoSQL from "../sql/anno";

// servicios de año
class AnnoService extends ServiceBase {
    // obtener todas las años
    public async getService() {
        const querys = AnnoSQL.getAnnoQuery();
        const [anno] = await pool.query(querys);
        return anno;
    }
    // obtener una año por id
    public async getServiceById(id: string) {
        const querys = AnnoSQL.getAnnoByIdQuery();
        const [anno] = await pool.query<RowDataPacket[]>(querys, [id]);
        return anno;
    }
}

export default new AnnoService();