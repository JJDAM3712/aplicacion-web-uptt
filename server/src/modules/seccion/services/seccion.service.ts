import { pool } from "../../../database/db";
import { RowDataPacket } from "mysql2";
import SeccionSQL from "../sql/seccion.query";
import { ServiceBase } from "../../../services/base.service";

class SeccionService extends ServiceBase{
    // obtener todas las seccion
    public async getService():Promise<any> {
        const querys = SeccionSQL.getSeccionQuery();
        const [result] = await pool.query<RowDataPacket[]>(querys);
        return result;
    }
    // obtener una seccion por id
    public async getServiceById(id: string):Promise<any> {
        const querys = SeccionSQL.getSeccionByIdQuery();
        const [result] = await pool.query<RowDataPacket[]>(querys, [id]);
        return result;
    }
    // insertar una seccion
    public async postService(data: any):Promise<any> {
        const sql = SeccionSQL.insertSeccionQuery();       

        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return result;
    }

    // actualizar una seccion
    public async putService(data: any, id: string):Promise<any> {
        const sql = SeccionSQL.updateSeccionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // eliminar una seccion
    public async deleteService(id:string):Promise<any> {
        const sql = SeccionSQL.deleteSeccionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
    // validar si la seccion
    //  existe
    public async getServiceExist(seccion:string):Promise<any> {
        const sql = SeccionSQL.getSeccionExistQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [seccion]);
        return result;
    }
    // valida si la seccion
    //  no esta repetida
    public async getServiceRepeat(seccion:string, id:string):Promise<any> {
        const sql = SeccionSQL.getSeccionByNombreQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [seccion, id]);
        return result;
    }
}

export default new SeccionService();