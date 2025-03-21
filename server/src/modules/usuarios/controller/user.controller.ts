import userService from "../services/user.service";
import profesorService from "../../profesor/service/profesor.service";
import estudianteService from "../../Estudiantes/services/estudiante.service";
import { Request, Response } from "express";
import { AppControllerBase } from "../../../controller/app.controller";
import dataBody from "../utils/dataBody";
import { pool } from "../../../database/db";

class UserController extends AppControllerBase {
    // mostrar todos los usuarios
    async getController(req: Request, res: Response): Promise<void> {
        try {
            const result = await userService.getService();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error});
        }
    }
    // mostrar un usuario por id
    async getControllerById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const result = await userService.getServiceById(id);
            // validar si existe el usuario
            if (result.length === 0) {
                res.status(404).json({message: "El usuario no existe"});
                return;
            }
            res.status(200).json(result);  
        } catch (error) {
            res.status(500).json({message:error})
        }
    }
    // registrar un usuarios
    async postController(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;

            // validar si el json es correcto
            try {
                JSON.stringify(data);
            } catch (error) {
                throw new Error("El json no es correcto");
            }
            // validar si el usuario existe
            const existUser = await userService.getServiceExist(data.cedula, data.email);
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
            const rol = data.id_rol;
            // rol admin
            switch(rol){
                // rol administrador
                case 1:
                    result = await userService.postService(data);
                    break;
                // rol profesor
                case 2:
                    // ejecuta las consultas como transacción
                    try {
                        (await connection).beginTransaction();
                        // separa los datos recibidos para usuarios
                        const dataUser = dataBody.dataUser(data);
                        
                        // almacena los datos en sus respectivas tablas
                        result = await userService.postServiceTransaction(dataUser, await connection);
                        // obtiene el id generado en esta consulta
                        const userId = result.insertId;
                        
                        // separa los datos de profesores
                        const dataProf = dataBody.dataProfesor(data);
                        // agrega el id generado anteriormente a profesores
                        dataProf.id_user = userId;
                    
                        resultUser = await profesorService.postServiceTransaction(dataProf, await connection);
                        // si no hubo problemas en ninguna consulta guarda los cambios en la bd
                        (await connection).commit();
                    } catch (error) {
                        // si una consulta fallo cancela ambas consultas
                        (await connection).rollback();
                        res.status(500).json({message: "Error al registrar el profesor", error});
                        return;
                    } finally {
                        // libera la conexion
                        (await connection).release();
                    }
                    break;
                // rol estudiante
                case 3:
                    try {
                        (await connection).beginTransaction();
                        // separa los datos recibidos para usuarios
                        const dataUser = dataBody.dataUser(data);
                        
                        // almacena los datos en sus respectivas tablas
                        result = await userService.postServiceTransaction(dataUser, await connection);
                        // obtiene el id generado en esta consulta
                        const userId = result.insertId;
                        
                        // separa los datos de profesores
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
                    break;
            }

            res.status(200).json({message: "Usuario registrado", resultUser, result});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: error});
        }
    }
    // actualizar un usuario
    async putController(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;

            // validar si el json es correcto
            try {
                JSON.stringify(data);
            } catch (error) {
                throw new Error("El json no es correcto");
            }

            // validar si el usuario existe
            const exist = await userService.getServiceById(req.params.id);
            if (exist.length === 0) {
                res.status(404).json({message: "El usuario no existe"});
                return;
            }
            
            // validar si el usuario o email este repetido
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
            
            const result = await userService.putService(data, req.params.id);
            res.status(200).json({message: "Usuario actualizado", result});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: error});
        }
    }
    // eliminar un usuario
    async deleteController(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            
            // validar si el usuario existe
            const exist = await userService.getServiceById(id);
            if (exist.length === 0) {
                res.status(404).json({message: "El usuario no existe"});
                return;
            }

            const result = await userService.deleteService(id);
            res.status(200).json({message: "Usuario eliminado", result});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Error al eliminar el usuario", error});
        }
    }
}

export default new UserController();