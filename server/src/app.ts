// importando modulos
import express, { Application } from "express";
import morgan from "morgan";
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from 'cookie-parser';

// importando rutas
import router  from "./routes/routes";
import { getDirname } from "./utils/dirname";

// configuracion de dirname
const __dirname = getDirname(import.meta.url);
dotenv.config({ path: `${__dirname}/../.env` });

// Inicializaciones
dotenv.config();
const app: Application = express();
const httpServer = createServer(app);

// middlewares
export const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: process.env.CORS_METHODS,
        credentials: true
    }
});
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: process.env.CORS_METHODS,
    credentials: true
}));

io.on('connection', (socket) => {
    console.log(`Cliente conectado a ${socket.id}`);

    socket.on('ActualizatTable', (data) => {
        io.emit('TablaActualizada', data)
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado a ${socket.id}`);
    })
});

app.use(morgan('dev'));

app.use(cookieParser());

// procesar los datos del cliente
app.use(express.json());

// rutas
app.use(router);

// validacion de token

// configuraciones 
app.set('port', process.env.PORT);


app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});
