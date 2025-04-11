import { createPool, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// variables de entorno
const host: string | undefined = process.env.HOST;
const user: string | undefined = process.env.USER_DATABASE;
const password: string | undefined = process.env.PASS_DATABASE;
const database: string | undefined = process.env.DATABASE;

// validacion de las variables de entorno
if (!host || !user || !database ) {
    throw new Error("Variables de entorno no definidas")
}

// conexion a la base de datos
let pool: Pool;


export const initPool = () => {
    try {
        pool = createPool({
            host: host,
            user: user,
            password: "",
            database: database,
        });
        console.log("Conexión a la base de datos exitosa");
    } catch (error) {
        throw new Error("Error al conectar a la base de datos");
    }
}

initPool();

export { pool };
