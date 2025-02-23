class MateriasSQL {
    // definiendo tipo de dato de las consultas
    public getMaterias: string;
    public getMateriasById: string;
    public insertMaterias: string;
    public updateMaterias: string;
    public deleteMaterias: string;
    public getMateriasByMateriaCreate: string;
    public getMateriasByMateriaUpdate: string;    

    // constructor con las consultas
    constructor() {
        this.getMaterias = "SELECT * FROM materias";
        this.getMateriasById = "SELECT * FROM materias WHERE id_materia = ?";
        this.insertMaterias = "INSERT INTO materias SET ?";
        this.updateMaterias = "UPDATE materias SET ? WHERE id_materia = ?";
        this.deleteMaterias = "DELETE FROM materias WHERE id_materia = ?";
        this.getMateriasByMateriaCreate = "SELECT * FROM materias WHERE materia = ?";
        this.getMateriasByMateriaUpdate = "SELECT * FROM materias WHERE materia = ? AND id_materia != ?";
    }
    // mostrar todos los datos de las materias
    getMateriasQuery() {return this.getMaterias;}
    // mostrar una materia por id
    getMateriasByIdQuery() {return this.getMateriasById;}
    // registrar una materia
    insertMateriasQuery() {return this.insertMaterias;}
    // actualizar una materia
    updateMateriasQuery() {return this.updateMaterias;}
    // eliminar una materia
    deleteMateriasQuery() {return this.deleteMaterias;}
    // validar si la materia existe
    getMateriasByNombreQuery() {return this.getMateriasByMateriaUpdate;}
    // valiodar si la materia existe
    getMateriasByMateriaQuery() {return this.getMateriasByMateriaCreate;}
}

export default new MateriasSQL();