import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id_usuario: number;
                id_rol: string;
                cedulal?: string;
                [key: string]: any;
            };
        }
    }
}

export {};
