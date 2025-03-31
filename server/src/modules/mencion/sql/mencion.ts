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
        this.getMencion = "SELECT * FROM mencion";
        this.getMencionById = "SELECT * FROM mencion WHERE id_mencion = ?";
        this.insertMencion = "INSERT INTO mencion SET ?";
        this.updateMencion = "UPDATE mencion SET ? WHERE id_mencion = ?";
        this.deleteMencion = "DELETE FROM mencion WHERE id_mencion = ?";
        this.getMencionByMencionCreate = "SELECT * FROM mencion WHERE mencion = ?";
        this.getMencionByMencionUpdate = "SELECT * FROM mencion WHERE mencion = ? AND id_mencion != ?";
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