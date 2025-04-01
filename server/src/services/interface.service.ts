export interface ServiceInterface {
    getService(): Promise<any>;
    getServiceById(id: string): Promise<any>;
    postService(data: any): Promise<any>;
    putService(data: any, id: string): Promise<any>;
    deleteService(id: string): Promise<any>;
    getServiceExist(data: any): Promise<any>;
    getServiceRepeat(data: string, id: string): Promise<any>;
}
