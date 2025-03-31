import { pool } from "../../../database/db";
import { ServiceBase } from "../../../services/base.service";
import { RowDataPacket } from "mysql2";
import MencionSQL from "../sql/mencion";

// servicios de mencion
class MencionService extends ServiceBase {
    // obtener todas las menciones
    public async getService() {
        const querys = MencionSQL.getMencionQuery();
        const [mencion] = await pool.query(querys);
        return mencion;
    }
    // obtener una mencion por id
    public async getServiceById(id: string) {
        const querys = MencionSQL.getMencionByIdQuery();
        const [mencion] = await pool.query<RowDataPacket[]>(querys, [id]);
        return mencion;
    }
    // insertar una mencion
    public async postService(data: any) {
        const sql = MencionSQL.insertMencionQuery();       

        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return { message: "Mencion registrada correctamente", data: result };
    }
    // actualizar una mencion
    public async putService(data: any, id: string) {
        const sql = MencionSQL.updateMencionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // eliminar una mencion
    public async deleteService(id:string) {
        const sql = MencionSQL.deleteMencionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
    // validar si la mencion existe
    public async getServiceExist(mencion:string, id:string) {
        const sql = MencionSQL.getMencionByMencionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [mencion, id]);
        return result;
    }
    // valida si la mencion no esta repetida
    public async getServiceRepeat(mencion:string, id:string) {
        const sql = MencionSQL.getMencionByNombreQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [mencion, id]);
        return result;
    }
}

export default new MencionService();