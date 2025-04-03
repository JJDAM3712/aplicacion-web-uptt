import { pool } from "../../../database/db";
import { ServiceBase } from "../../../services/base.service";
import { RowDataPacket } from "mysql2";
import EvaluacionSQL from "../sql/evaluacion.query";
import { io } from "../../../app";

// servicios de evaluacion
class EvaluacionService extends ServiceBase {
    // obtener todas las evaluacion
    public async getService() {
        const querys = EvaluacionSQL.getEvaluacionQuery();
        const [evaluaciones] = await pool.query(querys);
        return evaluaciones;
    }
    // obtener una evaluacion por id
    public async getServiceById(id: string) {
        const querys = EvaluacionSQL.getEvaluacionByIdQuery();
        const [evaluacion] = await pool.query<RowDataPacket[]>(querys, [id]);
        return evaluacion;
    }
    // insertar una evaluacion
    public async postService(data: any) {
        const sql = EvaluacionSQL.insertEvaluacionQuery();       

        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return { message: "Evaluacion registrada correctamente", data: result };
    }
    // actualizar una evaluacion
    public async putService(data: any, id: string) {
        const sql = EvaluacionSQL.updateEvaluacionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // eliminar una evaluacion
    public async deleteService(id:string) {
        const sql = EvaluacionSQL.deleteEvaluacionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
    // validar si la evaluacion existe
    public async getServiceExist(evaluacion:string) {
        const sql = EvaluacionSQL.getEvaluacionByEvaluacionQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [evaluacion]);
        return result;
    }
    // valida si la evaluacion no esta repetida
    public async getServiceRepeat(evaluacion:string, id:string) {
        const sql = EvaluacionSQL.getEvaluacionByNombreQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [evaluacion, id]);
        return result;
    }
}

export default new EvaluacionService();