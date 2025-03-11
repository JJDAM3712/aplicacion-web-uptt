import { pool } from "../../../database/db";
import { ServiceBase } from "../../../services/base.service";
import { RowDataPacket } from "mysql2";
import ProfesorSQL from "../sql/profesor.query";

// Servicio de profesores
class ProfesorService extends ServiceBase {
    // mostrar todos los profesores
    public async getService(): Promise<any> {
        const sql = ProfesorSQL.getProfQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql);
        return result;
    }
    // mostrar profesor por id
    public async getServiceById(id: string): Promise<any> {
        const sql = ProfesorSQL.getProfByIdQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
    // registrar profesores
    public async postService(data: any): Promise<any> {
        const sql = ProfesorSQL.postProfQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return result;
    }
    // validar que el profesor exista
    public async getServiceExist(data: any, id: string): Promise<any> {
        const sql = ProfesorSQL.getProfExistQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // actualizar el profesor
    public async putService(data: any, id: string): Promise<any> {
         const sql = ProfesorSQL.putProfQuery();
         const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
         return result;
    }
    // validar que el profesor no este repetido
    public async getServiceRepeat(data: string, id: string): Promise<any> {
        const sql = ProfesorSQL.getProfRepeatQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // borrar el profesor
    public async deleteService(id: string): Promise<any> {
        const sql = ProfesorSQL.deleteProfQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
}

export default new ProfesorService();