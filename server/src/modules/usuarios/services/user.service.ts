import { pool } from "../../../database/db";
import { ServiceBase } from "../../../services/base.service";
import { RowDataPacket } from "mysql2";
import userSql from "../sql/user.sql";
import { PoolConnection } from "mysql2/promise";

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
    // registrar profesores y usuario admin
    async postService(data: any): Promise<any> {
        const sql = userSql.postUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return result;
    }
    // registrar un usuario (transaccion)
    async postServiceTransaction(data: any, connection: PoolConnection): Promise<any> {
        const sql = userSql.postUserQuery();
        const [result] = await connection.query<RowDataPacket[]>(sql, data);
        return result;
    }
    // actualizar un usuario (transaccion)
    async putServiceTransaction(data: any, id: string, connection: PoolConnection): Promise<any> {
        const sql = userSql.putUserQuery();
        const [result] = await connection.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // actualizar un usuario
    async putService(data: any, id: string): Promise<any> {
        const sql = userSql.putUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // validar usuario y email repetido
    async getDataRepeat(cedula: string, email:string, id: string): Promise<any> {
        const sql = userSql.repeatUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [cedula, email, id]);
        return result;
    }
    // validar que un usuario exista
    async getUserServiceExist(cedula: string, email: string): Promise<any> {
        const sql = userSql.existUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [cedula, email]);
        return result;
    }
    // eliminar un usuario
    async deleteService(id: string): Promise<any> {
        const sql = userSql.deleteUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql,id);
        return result;
    }
}

export default new UserService();