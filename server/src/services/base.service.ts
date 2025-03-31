import { ServiceInterface } from "./interface.service";

export class ServiceBase implements ServiceInterface {
    // servicio mostrar todos los datos
    public async getService(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    // servicio mostrar los datos por id
    public async getServiceById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    // servicio para crear datos
    public async postService(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    // servicio para actualizar datos
    public async putService(data: any, id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    // servicios para borrar datos
    public async deleteService(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    // servicio para validar datos existentes
    public async getServiceExist(data: any): Promise<any> {
        throw new Error("Method not implemented");
    }
    // servicio para validar datos repetidos
    public async getServiceRepeat(data: string, id: string): Promise<any> {
        throw new Error("Method not implemented");
    }
}