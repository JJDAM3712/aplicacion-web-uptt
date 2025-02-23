import { pool } from "../../database/db";
import { RowDataPacket } from "mysql2";
import MensionSQL from "../querys/mension";

class MensionService {
    // obtener todas las mension

    public async getMension() {
        const querys = MensionSQL.getMensionQuery();
        const [mension

        ] = await pool.query(querys);
        return mension
        ;
    }
    // obtener una mension
    //  por id
    public async getMensionById(id: string) {
        const querys = MensionSQL.getMensionByIdQuery();
        const [mension

        ] = await pool.query<RowDataPacket[]>(querys, [id]);
        return mension
        ;
    }
    // insertar una mension

    public async postMension(data: any) {
        const {mension
            , descripcion} = data;
        const sql = MensionSQL.insertMensionQuery();       

        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return { message: "Mension registrada correctamente", data: result };
    }

    // actualizar una mension

    public async putMension(data: any, id: string) {
        const sql = MensionSQL.updateMensionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // eliminar una mension

    public async deleteMension(id:string) {
        const sql = MensionSQL.deleteMensionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
    // validar si la mension
    //  existe
    public async getMensionNombre(mension
        :string, id:string) {
        const sql = MensionSQL.getMensionByMensionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [mension, id]);
        return result;
    }
    // valida si la mension
    //  no esta repetida
    public async getMensionRepetida(mension:string, id:string) {
        const sql = MensionSQL.getMensionByNombreQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [mension, id]);
        return result;
    }
}

export default new MensionService();