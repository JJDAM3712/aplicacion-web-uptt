// importando modulos
import express from "express";
import morgan from "morgan";
import cors from 'cors';
//import { Server } from "socket.io";
//import { createServer } from "http";
//import cookieParser from 'cookie-parser';

// importando rutas
import materiasRoutes from "./materias/routes/materias.routes.js";
import notasRoutes from "./notas/routes/notas.routes.js";

// Inicializaciones
const app = express();
//const httpServer = createServer(app);

// middlewares
/*
export const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log(`Cliente conectado a ${socket.id}`);

    socket.on('ActualizatTable', (data) => {
        io.emit('TablaActualizada', data)
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado a ${socket.id}`);
    })
});*/

app.use(cors({
    origin: 'http://localhost:3000', //permitir solicitudes desde tel cliente
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true //enviar cookies o headers de autenticación
}));

//app.use(cookieParser());

// procesar los datos del cliente
app.use(express.json());

// rutas
app.use("/api", materiasRoutes, notasRoutes);

// validacion de token

// configuraciones 
app.use(morgan('dev'));
app.set('port', process.env.PORT || 4000);


app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});
