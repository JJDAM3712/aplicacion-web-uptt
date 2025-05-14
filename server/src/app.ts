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

// Inicializaciones
dotenv.config();
const app: Application = express();
const httpServer = createServer(app);


// middlewares
export const io = new Server(httpServer, {
    path: '/api/socket.io',
    cors: {
        origin: "",
        methods: ['GET','POST','PUT','DELETE'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    

    socket.on('ActualizarTable', (data) => {
        console.log(`Cliente conectado a ${socket.id}`);
        io.emit('TablaActualizada', data)
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado a ${socket.id}`);
    })
});
app.use(cors({
    origin: '',
    methods: process.env.CORS_METHODS,
    credentials: true
}))

app.use(morgan('dev'));

app.use(cookieParser());

// procesar los datos del cliente
app.use(express.json());


// rutas
app.use(router);

// validacion de token

// configuraciones 
app.set('port', process.env.PORT);


httpServer.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});
