import { pool } from "../../../database/db";
import NotasSQL from "../sql/notas";
import { RowDataPacket } from "mysql2";
import { ServiceBase } from "../../../services/base.service";

class NotasService extends ServiceBase {
    // obtener todas las notas
    public async getService() {
        try {
            const sql = NotasSQL.getNotasQuery();
            const result = await pool.query<RowDataPacket[]>(sql);
            return result[0];
        } catch (error) {
            return error;
        }
    }
    // obtener una nota por id
    public async getServiceById(id:string) {
        try {
            const sql = NotasSQL.getNotasByIdQery();
            const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
            return result;
        } catch (error) {
            return error
        }
    }
    // insertar una nota
    public async postService(data:any) {
        try {
            const sql = NotasSQL.postNotasQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql, data);
            return result
        } catch (error) {
            return error;
        }
    }
    // actualizar una nota
    public async putService(data: any, id:string) {
        try {
            const sql = NotasSQL.putNotasQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
            return result;
        } catch (error) {
            return error;
        }
    }
    // eliminar una nota
    public async deleteService(id:string) {
        try {
            const sql = NotasSQL.deleteNotasQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
            return result;
        } catch (error) {
            return error;
        }
    }
}

export default new NotasService();