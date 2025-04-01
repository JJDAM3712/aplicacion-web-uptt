import { pool } from "../../../database/db";
import { ServiceBase } from "../../../services/base.service";
import { RowDataPacket } from "mysql2";
import ProfesorSQL from "../sql/profesor.query";
import { PoolConnection } from "mysql2/promise";

// Servicio de profesores
class ProfesorService extends ServiceBase {
    // mostrar todos los profesores
    public async getService(): Promise<any> {
        const sql = ProfesorSQL.getProfQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql);
        return result;
    }
    // mostrar profesor por id
    public async getServiceById(id: string): Promise<any> {
        const sql = ProfesorSQL.getProfByIdQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
    // registrar profesores
    public async postServiceTransaction(data: any, connection: PoolConnection): Promise<any> {
        const sql = ProfesorSQL.postProfQuery();
        const [result] = await connection.query<RowDataPacket[]>(sql, data);
        return result;
    }  
    
    // actualizar el profesor
    public async putService(data: any, id: string): Promise<any> {
         const sql = ProfesorSQL.putProfQuery();
         const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
         return result;
    }
    // validar que el profesor no este repetido
    public async getServiceRepeat(data: string, id: string): Promise<any> {
        const sql = ProfesorSQL.getProfRepeatQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [data, id]);
        return result;
    }
    // borrar el profesor
    public async deleteService(id: string): Promise<any> {
        const sql = ProfesorSQL.deleteProfQuery();
        const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
        return result;
    }
    

    // --- servicios de clases --- //
    // mostrar una clase por id
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
    // validar que el profesor exista
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
        const value = [data.id_materias, data.id_seccion, data.id_anno, data.id_mension];
        const result = await pool.query<RowDataPacket[]>(sql, value);
        return result;
    }
    // borrar clase
    public async deleteClaseService(id: string): Promise<any> {
        const sql = ProfesorSQL.deleteClaseQuery();
        const [result] = await pool.query(sql, id);
        return result;
    }
}

export default new ProfesorService();