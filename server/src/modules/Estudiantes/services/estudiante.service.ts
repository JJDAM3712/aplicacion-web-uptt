import { pool } from "../../../database/db";
import { RowDataPacket } from "mysql2";
import EstudiantesSQL from "../sql/estudiante.query"
import { ServiceBase } from "../../../services/base.service";

// Servicio de estudiantes
class EstudianteService extends ServiceBase {
    // mostrar todos los estudiantes
    public async getService(): Promise<any> {
        try {
            const sql = EstudiantesSQL.getEstudiantesQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql);
            return result;
        } catch (error) {
            return `Error al mostrar todos los estudiantes ${error}`;
        } 
    }
    // mostrar estudiante por id
    public async getServiceById(id: string): Promise<any> {
        try {
            const sql = EstudiantesSQL.getEstudianteByIdQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
            return result;
        } catch (error) {
            return `Error al mostrar al estudiante ${error}`;
        }
    }
    // registrar estudiantes
    public async postService(data: any): Promise<any> {
        try {
            const sql = EstudiantesSQL.postEstudianteQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql, data);
            return result;
        } catch (error) {
            return `Error al registrar al estudiante ${error}`;
        }
    }
    // validar que el estudiante exista
    public async getServiceExist(data: any, id: string): Promise<any> {
        try {
            const sql = EstudiantesSQL.getEstudianteExistQuery();
            const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
            return result;
        } catch (error) {
            return error;
        }
    }
    // actualizar el estudiante
    public async putService(data: any, id: string): Promise<any> {
        const sql = EstudiantesSQL.putEstudianteQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // validar que el estudiante no este repetido
    public async getServiceRepeat(data: string, id: string): Promise<any> {
        const sql = EstudiantesSQL.getEstudianteRepeatQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // borrar el estudiante
    public async deleteService(id: string): Promise<any> {
        const sql = EstudiantesSQL.deleteEstudianteQuery();
        const [result] = await pool.query(sql, id);
        return result;
    }
}

export default new EstudianteService();