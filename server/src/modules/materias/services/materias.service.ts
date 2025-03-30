import { pool } from "../../../database/db";
import { ServiceBase } from "../../../services/base.service";
import { RowDataPacket } from "mysql2";
import MateriasSQL from "../sql/materias";

// servicios de materias
class MateriaService extends ServiceBase {
    // obtener todas las materias
    public async getService() {
        const querys = MateriasSQL.getMateriasQuery();
        const [materias] = await pool.query(querys);
        return materias;
    }
    // obtener una materia por id
    public async getServiceById(id: string) {
        const querys = MateriasSQL.getMateriasByIdQuery();
        const [materia] = await pool.query<RowDataPacket[]>(querys, [id]);
        return materia;
    }
    // insertar una materia
    public async postService(data: any) {
        const sql = MateriasSQL.insertMateriasQuery();       

        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return { message: "Materia registrada correctamente", data: result };
    }
    // actualizar una materia
    public async putService(data: any, id: string) {
        const sql = MateriasSQL.updateMateriasQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // eliminar una materia
    public async deleteService(id:string) {
        const sql = MateriasSQL.deleteMateriasQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
    // validar si la materia existe
    public async getServiceExist(materia:string) {
        const sql = MateriasSQL.getMateriasByMateriaQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [materia]);
        return result;
    }
    // valida si la materia no esta repetida
    public async getServiceRepeat(materia:string, id:string) {
        const sql = MateriasSQL.getMateriasByNombreQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [materia, id]);
        return result;
    }
}

export default new MateriaService();