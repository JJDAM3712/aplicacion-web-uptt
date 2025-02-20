import { pool } from "../../database/db";
import { RowDataPacket } from "mysql2";
import MateriasSQL from "../querys/materias";

class MateriaService {
    // obtener todas las materias
    public async getMaterias() {
        const querys = MateriasSQL.getMateriasQuery();
        const [materias] = await pool.query(querys);
        return materias;
    }
    // obtener una materia por id
    public async getMateriaById(id: string) {
        const querys = MateriasSQL.getMateriasByIdQuery();
        const [materia] = await pool.query<RowDataPacket[]>(querys, [id]);
        return materia;
    }
    // insertar una materia
    public async postMaterias(data: any) {
        const {materia, descripcion} = data;
        const sql = MateriasSQL.insertMateriasQuery();       

        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return { message: "Materia registrada correctamente", data: result };
    }

    // actualizar una materia
    public async putMaterias(data: any, id: string) {
        const sql = MateriasSQL.updateMateriasQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // eliminar una materia
    public async deleteMaterias(id:string) {
        const sql = MateriasSQL.deleteMateriasQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
    // validar si la materia existe
    public async getMateriasNombre(materia:string, id:string) {
        const sql = MateriasSQL.getMateriasByMateriaQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [materia, id]);
        return result;
    }
    // valida si la materia no esta repetida
    public async getMateriasRepetida(materia:string, id:string) {
        const sql = MateriasSQL.getMateriasByNombreQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [materia, id]);
        return result;
    }
}

export default new MateriaService();