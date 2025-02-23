
class MensionSQL {
    // definiendo tipo de dato de las consultas
    public getMension: string;
    public getMensionById: string;
    public insertMension: string;
    public updateMension: string;
    public deleteMension: string;
    public getMensionByMensionCreate: string;
    public getMensionByMensionUpdate: string;    

    // constructor con las consultas
    constructor() {
        this.getMension = "SELECT * FROM mension";
        this.getMensionById = "SELECT * FROM mension WHERE id_mension = ?";
        this.insertMension = "INSERT INTO mension SET ?";
        this.updateMension = "UPDATE mension SET ? WHERE id_mension = ?";
        this.deleteMension = "DELETE FROM mension WHERE id_mension = ?";
        this.getMensionByMensionCreate = "SELECT * FROM mension WHERE mension = ?";
        this.getMensionByMensionUpdate = "SELECT * FROM mension WHERE mension = ? AND id_mension != ?";
    }
    // mostrar todos los datos de las mension
    getMensionQuery() {return this.getMension;}
    // mostrar una mension por id
    getMensionByIdQuery() {return this.getMensionById;}
    // registrar una mension
    insertMensionQuery() {return this.insertMension;}
    // actualizar una mension
    updateMensionQuery() {return this.updateMension;}
    // eliminar una mension
    deleteMensionQuery() {return this.deleteMension;}
    // validar si la mension existe
    getMensionByNombreQuery() {return this.getMensionByMensionUpdate;}
    // valiodar si la mension existe
    getMensionByMensionQuery() {return this.getMensionByMensionCreate;}
}

export default new MensionSQL();