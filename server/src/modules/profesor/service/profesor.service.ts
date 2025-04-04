import { pool } from "../../../database/db";
import { ServiceBase } from "../../../services/base.service";
import { RowDataPacket } from "mysql2";
import ProfesorSQL from "../sql/profesor.query";
import { PoolConnection } from "mysql2/promise";

// Servicio de profesores
class ProfesorService extends ServiceBase {
    // mostrar profesores
    public async getProfService(): Promise<any> {
        const sql = ProfesorSQL.showProfesor();
        const [result] = await pool.query<RowDataPacket[]>(sql);
        return result;
    } 
    // mostrar un profesor por id
    public async getProfServiceById(id:string): Promise<any> {
        const sql = ProfesorSQL.showProfesorById();
        const [result] = await pool.query<RowDataPacket[]>(sql, id);
        return result;
    }
    // registrar profesores
    public async postServiceTransaction(data: any, connection: PoolConnection): Promise<any> {
        const sql = ProfesorSQL.postProfQuery();
        const [result] = await connection.query<RowDataPacket[]>(sql, data);
        return result;
    }
    // validar que el profesor no este repetido
    public async getServiceRepeat(data: string, id: string): Promise<any> {
        const sql = ProfesorSQL.getProfRepeatQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // borrar una clase
    public async deleteService(id: string): Promise<any> {
        const sql = ProfesorSQL.deleteProfQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }

    // --- servicios de clases --- //
    // mostrar todos los profesores con sus clases
    public async getService(): Promise<any> {
        const sql = ProfesorSQL.getProfClasesQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql);
        return result;
    }
    // mostrar clase por id
    public async getServiceById(id: string): Promise<any> {
        const sql = ProfesorSQL.getClasesProfByIdQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
    // mostrar una clase por id para validar existensia
    public async getClaseByService(id: string): Promise<any> {
        const sql = ProfesorSQL.getClaseByQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, id);
        return result;
    }
    // registrar clase de profesores
    public async postClaseService(data: any){
        const sql = ProfesorSQL.postProfQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, data);
        return result;
    }
    // validar que la clase exista
    public async getServiceExist(data: any): Promise<any> {
        const sql = ProfesorSQL.getClaseExistQuery();
        
        const value = [data.id_user, data.id_materias, data.id_seccion, data.id_anno, data.id_mension];

        const [result] = await pool.query<RowDataPacket[]>(sql, value);
        return result;
    }
    // cambiar profesor a null
    public async profNullClaseService(id: string): Promise<any> {
        const sql = ProfesorSQL.profClaseNull();
        const result = await pool.query<RowDataPacket[]>(sql, id);
        return result;
    }
    // validar que una clase la de otro profesor
    public async claseOtherProfService(data:any): Promise<any> {
        const sql = ProfesorSQL.claseOtherProf();
        const result = await pool.query<RowDataPacket[]>(sql, [
                                                                data.id_materias, 
                                                                data.id_seccion, 
                                                                data.id_anno,
                                                                data.id_mension
                                                            ]);
        return result;
    }
    // actualizar una clase
    public async putService(data: any, id: string): Promise<any> {
        const sql = ProfesorSQL.putClaseQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [
                                                                data.id_user, 
                                                                data.id_materias,
                                                                data.id_seccion,
                                                                data.id_anno,
                                                                data.id_mension, 
                                                                id
                                                            ]);
        return result;
    }
    // validar que una clase este repetida
    public async classExistService(data: any, id: string): Promise<any> {
        const sql = ProfesorSQL.putClaseExistQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [
                                                                data.id_materias,
                                                                data.id_seccion,
                                                                data.id_anno,
                                                                data.id_mension,
                                                                id
                                                            ]);
        return result;
    }
    // borrar clase
    public async deleteClaseService(id: string): Promise<any> {
        const sql = ProfesorSQL.deleteClaseQuery();
        const [result] = await pool.query(sql, id);
        return result;
    }
    // consultas para filtrar clases
    public async filterMateriaService(id:string):Promise<any> {
        const sql = ProfesorSQL.FilterMaterias();
        const [result] = await pool.query<RowDataPacket[]>(sql, id);
        return result;

    }
    public async filterMencionService(id:string):Promise<any> {
        const sql = ProfesorSQL.FilterMenciones();
        const [result] = await pool.query<RowDataPacket[]>(sql, id);
        return result;
    }
    public async filterAnioService(id:string):Promise<any> {
        const sql = ProfesorSQL.FilterAnios();
        const [result] = await pool.query<RowDataPacket[]>(sql, id);
        return result;
    }
    public async filteSeccionService(id:string):Promise<any> {
        const sql = ProfesorSQL.FilterSecciones();
        const [result] = await pool.query<RowDataPacket[]>(sql, id);
        return result;
    }
}

export default new ProfesorService();