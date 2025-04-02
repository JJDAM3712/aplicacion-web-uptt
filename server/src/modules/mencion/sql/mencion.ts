class MencionSQL {
    // definiendo tipo de dato de las consultas
    public getMencion: string;
    public getMencionById: string;
    public insertMencion: string;
    public updateMencion: string;
    public deleteMencion: string;
    public getMencionByMencionCreate: string;
    public getMencionByMencionUpdate: string;    

    // constructor con las consultas
    constructor() {
        this.getMencion = "SELECT * FROM mensiones";
        this.getMencionById = "SELECT * FROM mensiones WHERE id_mension = ?";
        this.insertMencion = "INSERT INTO mensiones SET ?";
        this.updateMencion = "UPDATE mensiones SET ? WHERE id_mension = ?";
        this.deleteMencion = "DELETE FROM mensiones WHERE id_mension = ?";
        this.getMencionByMencionCreate = "SELECT * FROM mensiones WHERE mension = ?";
        this.getMencionByMencionUpdate = "SELECT * FROM mensiones WHERE mension = ? AND id_mension != ?";
    }
    // mostrar todos los datos de las mencion
    getMencionQuery() {return this.getMencion;}
    // msotrar una mencion por id
    getMencionByIdQuery() {return this.getMencionById;}
    // registrar una mencion
    insertMencionQuery() {return this.insertMencion;}
    // actualizar una mencion
    updateMencionQuery() {return this.updateMencion;}
    // eliminar una mencion
    deleteMencionQuery() {return this.deleteMencion;}
    // validar si la mencion existe
    getMencionByNombreQuery() {return this.getMencionByMencionUpdate;}
    // valiodar si la mencion existe
    getMencionByMencionQuery() {return this.getMencionByMencionCreate;}
}

export default new MencionSQL();