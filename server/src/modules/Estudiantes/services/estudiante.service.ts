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
}

export default new EstudianteService();