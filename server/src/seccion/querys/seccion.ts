class SeccionSQL {
    putSeccionQuery() {
        throw new Error('Method not implemented.');
    }
    // definiendo tipo de dato de las consultas
    public getSeccion: string;
    public getSeccionById: string;
    public insertSeccion: string;
    public updateSeccion: string;
    public deleteSeccion: string;
    public getSeccionBySeccionCreate: string;
    public getSeccionBySeccionUpdate: string;    

    // constructor con las consultas
    constructor() {
        this.getSeccion = "SELECT * FROM seccion";
        this.getSeccionById = "SELECT * FROM seccion WHERE id_seccion = ?";
        this.insertSeccion = "INSERT INTO seccion SET ?";
        this.updateSeccion = "UPDATE seccion SET ? WHERE id_seccion = ?";
        this.deleteSeccion = "DELETE FROM seccion WHERE id_seccion = ?";
        this.getSeccionBySeccionCreate = "SELECT * FROM seccion WHERE seccion = ?";
        this.getSeccionBySeccionUpdate = "SELECT * FROM seccion WHERE seccion = ? AND id_seccion != ?";
    }
    // mostrar todos los datos de las seccion
    getSeccionQuery() {return this.getSeccion;}
    // mostrar una seccion por id
    getSeccionByIdQuery() {return this.getSeccionById;}
    // registrar una seccion
    insertSeccionQuery() {return this.insertSeccion;}
    // actualizar una seccion
    updateSeccionQuery() {return this.updateSeccion;}
    // eliminar una seccion
    deleteSeccionQuery() {return this.deleteSeccion;}
    // validar si la seccion existe
    getSeccionByNombreQuery() {return this.getSeccionBySeccionUpdate;}
    // valiodar si la seccion existe
    getSeccionBySeccionQuery() {return this.getSeccionBySeccionCreate;}
}

export default new SeccionSQL();