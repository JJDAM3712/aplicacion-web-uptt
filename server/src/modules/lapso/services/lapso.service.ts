import { ServiceBase } from "../../../services/base.service";
import {pool} from "../../../database/db";
import { RowDataPacket } from "mysql2";
import lapsoQuery from "../sql/lapso.query";

class LapsoService extends ServiceBase {
    // mostrar todos los lapsos
    async getService(): Promise<any> {
        const sql = lapsoQuery.getLapsoQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql);
        return result;
    }
    // mostrar un lapso por ID
    async getServiceById(id: string): Promise<any> {
        const sql = lapsoQuery.getLapsoByIdQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, id);
        return result;
    }
}

export default new LapsoService();