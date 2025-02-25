import { pool } from "../../database/db";
import { RowDataPacket } from "mysql2";
import SeccionSQL from "../querys/seccion";

class SeccionService {
    // obtener todas las seccion

    public async getSeccion() {
        const querys = SeccionSQL.getSeccionQuery();
        const [seccion

        ] = await pool.query(querys);
        return seccion
        ;
    }
    // obtener una seccion
    //  por id
    public async getSeccionById(id: string) {
        const querys = SeccionSQL.getSeccionByIdQuery();
        const [seccion

        ] = await pool.query<RowDataPacket[]>(querys, [id]);
        return seccion
        ;
    }
    // insertar una seccion

    public async postSeccion(data: any) {
        const {seccion: seccion
            , descripcion} = data;
        const sql = SeccionSQL.insertSeccionQuery();       

        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return { message: "seccion registrada correctamente", data: result };
    }

    // actualizar una seccion

    public async putSeccion(data: any, id: string) {
        const sql = SeccionSQL.updateSeccionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // eliminar una seccion

    public async deleteSeccion(id:string) {
        const sql = SeccionSQL.deleteSeccionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
    // validar si la seccion
    //  existe
    public async getSeccionNombre(seccion
        :string, id:string) {
        const sql = SeccionSQL.getSeccionBySeccionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [seccion, id]);
        return result;
    }
    // valida si la seccion
    //  no esta repetida
    public async getSeccionRepetida(seccion:string, id:string) {
        const sql = SeccionSQL.getSeccionByNombreQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [seccion, id]);
        return result;
    }
}

export default new SeccionService();