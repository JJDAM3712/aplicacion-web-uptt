import { pool } from "../../../database/db";
import { ServiceBase } from "../../../services/base.service";
import { RowDataPacket } from "mysql2";
import userSql from "../sql/user.sql";
import bcrypt from "bcryptjs";

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
        const salt = await bcrypt.genSaltSync(10);
        const clave = await bcrypt.hashSync(data.clave, salt);
        data.clave = clave;
    
        const sql = userSql.postUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return result;
    }
    // actualizar un usuario
    async putService(data: any, id: string): Promise<any> {
        const sql = userSql.putUserQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
}

export default new UserService();