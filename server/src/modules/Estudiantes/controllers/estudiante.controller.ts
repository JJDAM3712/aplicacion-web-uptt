import estudianteService from "../services/estudiante.service";
import { AppControllerBase } from "../../../controller/app.controller";
import { Request, Response } from "express";
import userService from "../../usuarios/services/user.service";
import { pool } from "../../../database/db";
import dataBody from "../../usuarios/utils/dataBody";

// controladores de estudiantes
class EstudianteController extends AppControllerBase {
    // mostrar todos los estudiantes
    public async getController(req: Request, res: Response): Promise<void> {
        try {
            // recibe los parametros del endpoint
            const {anno, seccion, mension} = req.query;

            const result = await estudianteService.getEstudianteService(anno, seccion, mension);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message: error});
        }
    }
    // mostrar un estudiante por id
    public async getControllerById(req: Request, res: Response): Promise<void> {
        try {
            const result = await estudianteService.getServiceById(req.params.id);
            
            // valida si existe el estudiante
            if (result.length === 0) {
                res.status(404).json({mensaje: "El estudiante no existe"});
                return;
            }
            console.log("usuario = ", result[0].id_user);
            if (!result[0].id_user){
                res.status(404).json({message: "El estudiante no existe"});
                return;
            }
            res.status(200).json({result})
        } catch (error) {
            res.status(500).json(error);
        }
    }
    // registrar un estudiante
    public async postController(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;

            // validar si el json es correcto
            try {
                JSON.stringify(data);
            } catch (error) {
                throw new Error("El json no es correcto");
            }
            // validar si el usuario existe
            const existUser = await userService.getUserServiceExist(data.cedula, data.email);
            if (existUser.length > 0) {
                if(existUser[0].cedula === data.cedula) {
                    res.status(409).json({message: "Esta cedula ya se encuentra registrada"});
                    return; 
                } else if (existUser[0].email === data.email) {
                    res.status(408).json({message: "Este email ya se encuentra registrada"});
                    return;
                }
            }
            var result: any;
            var resultUser: any;
            var connection = pool.getConnection();
            // seleccionar rol
            data.id_rol = 3;
            
            try {
                // realiza la consulta como transaccion
                (await connection).beginTransaction();
                // separa los datos recibidos para usuarios
                const dataUser = dataBody.dataUser(data);
                
                // almacena los datos en sus respectivas tablas
                result = await userService.postServiceTransaction(dataUser, await connection);
                // obtiene el id generado en esta consulta
                const userId = result.insertId;
                
                // separa los datos de estudiantes
                const dataEstudiante = dataBody.dataEstudiante(data);
                // agrega el id generado anteriormente a estudiantes
                dataEstudiante.id_user = userId;
            
                resultUser = await estudianteService.postServiceTransaction(dataEstudiante, await connection);
                // si no hubo problemas en ninguna consulta guarda los cambios en la bd
                (await connection).commit();
            } catch (error) {
                // si una consulta fallo cancela ambas consultas
                (await connection).rollback();
                res.status(500).json({message: "Error al registrar el estudiante", error});
                return;
            } finally {
                // libera la conexion
                (await connection).release();
            }

            res.status(200).json({message: "Estudiante registrado", resultUser, result});
        } catch (error) {
            res.status(500).json({error});
        }
    }
    // actualizar estudiantes
    public async putController(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            // validar que el estudiante exista
            const existeID = await userService.getServiceById(req.params.id);
            if (existeID.length === 0) {
                res.status(404).json({message: "El estudiante no existe"});
                return;
            }
            // validar que el estudiante no este repetido
            const repeat = await userService.getDataRepeat(data.cedula, data.email, req.params.id);

            if (repeat.length > 0) {
                if(repeat[0].cedula === data.cedula) {
                    res.status(409).json({message: "Este nombre de usuario ya se encuentra en uso"});
                    return; 
                } else if (repeat[0].email === data.email) {
                    res.status(408).json({message: "Este email ya se encuentra en uso"});
                    return;
                }
                        }
            var result: any;
            var resultUser: any;
            var connection = pool.getConnection();
            // seleccionar rol
            data.id_rol = 3;
            
            try {
                // realiza la consulta como transaccion
                (await connection).beginTransaction();
                // separa los datos recibidos para usuarios
                const dataUser = dataBody.dataUser(data);
                
                // almacena los datos en sus respectivas tablas
                result = await userService.putServiceTransaction(dataUser, req.params.id, await connection);
                
                // separa los datos de estudiantes
                const dataEstudiante = dataBody.dataEstudiante(data);
                // agrega el id del usuario
                dataEstudiante.id_user = req.params.id;

                resultUser = await estudianteService.putServiceTransactin(dataEstudiante, req.params.id, await connection);
                // si no hubo problemas en ninguna consulta guarda los cambios en la bd
                (await connection).commit();
            } catch (error) {
                // si una consulta fallo cancela ambas consultas
                (await connection).rollback();
                res.status(500).json({message: "Error al registrar el estudiante", error});
                return;
            } finally {
                // libera la conexion
                (await connection).release();
            }
            // actualizar
            res.status(200).json({message: "Estudiante actualizado", data: result, resultUser});
        } catch (error) {
            res.status(500).json({message:"error al actualizar estudiante", error});
        }
    }
    // borrar estudiantes
    public async deleteController(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;

            // validar que el estudiante exista
            const exist =  await estudianteService.getServiceById(id);
            if (exist.length === 0) {
                res.status(404).json({message: "El estudiante no existe"});
                return;
            }

            // valida que el usuario sea alumno
            const userIsAl = await estudianteService.UserIsAlum(id);
            if (userIsAl.length === 0){
                res.status(404).json({message: "El usuario no es un estudiante"});
                return;
            }
            
            // eliminar datos de tabla estudiante
            const deleteAlum = await estudianteService.deleteService(exist[0].id_user);

            // eliminar datos de taba usuarios
            const deleteUser = await userService.deleteService(id);
            res.status(200).json({
                message: "Estudiante eliminado existosamente", 
                deleteAlum: deleteAlum,
                deleteUser: deleteUser
            });
        } catch (error) {
            res.status(500).json({message: "Error al eliminar", data: error})
        }
    }
}

export default new EstudianteController();