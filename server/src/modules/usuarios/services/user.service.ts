import { pool } from "../../../database/db";
import { ServiceBase } from "../../../services/base.service";
import { RowDataPacket } from "mysql2";
import userSql from "../sql/user.sql";
import { hashPass } from "../../../utils/hash";

class UserService extends ServiceBase {
    // mostrar todos los usuarios
    async getService(): Promise<any> {
        const sql = userSql.getUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql);
        return result;
    }
    // mostrar un ususaio por id
    async getServiceById(id: string): Promise<any> {
        const sql = userSql.getUserIdQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, id);
        return result;
    }
    // registrar un usuario
    async postService(data: any): Promise<any> {
        // encriptar la contraseña
        const pass = await hashPass(data.clave);
        data.clave = pass;
    
        const sql = userSql.postUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return result;
    }
    // actualizar un usuario
    async putService(data: any, id: string): Promise<any> {
        // emcriptar la contraseña
        const pass = await hashPass(data.clave);
        data.clave = pass;

        const sql = userSql.putUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // validar que un usuario exista
    async getServiceExist(data: any, id: string): Promise<any> {
        const sql = userSql.existUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return result;
    }
    // validar que un email exista
    async getServiceEmailExist(data:any, id:string): Promise<any> {
        const sql = userSql.existUserEmailQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return result;
    }
    // validar usuario repetido
    async getUserRepeat(user: string, id: string): Promise<any> {
        const sql = userSql.repeatUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [user, id]);
        return result;
    }
    // validar email repetido
    async getEmailRepeat(email: string, id: string): Promise<any> {
        const sql = userSql.repeatEmailQuery();
        const [result] = await
    }
    // eliminar un usuario
    async deleteService(id: string): Promise<any> {
        const sql = userSql.deleteUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql,id);
        return result;
    }
}

export default new UserService();