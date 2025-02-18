class Materias {
    constructor() {
        this.getMaterias = "SELECT * FROM materias";
        this.getMateriasById = "SELECT * FROM materias WHERE id_materia = ?";
        this.insertMaterias = "INSERT INTO materias SET ?";
        this.updateMaterias = "UPDATE materias SET ? WHERE id_materia = ?";
        this.deleteMaterias = "DELETE FROM materias WHERE id_materia = ?";
        this.getMateriasByMateriaCreate = "SELECT * FROM materias WHERE materia = ?";
        this.getMateriasByMateriaUpdate = "SELECT * FROM materias WHERE materia = ? AND id_materia != ?";
    }

    getMateriasQuery() {
        return this.getMaterias;
    }
    getMateriasByIdQuery() {
        return this.getMateriasById;
    }
    insertMateriasQuery() {
        return this.insertMaterias;
    }
    updateMateriasQuery() {
        return this.updateMaterias;
    }
    deleteMateriasQuery() {
        return this.deleteMaterias;
    }
    getMateriasByNombreQuery() {
        return this.getMateriasByMateriaUpdate;
    }
    getMateriasByMateriaQuery() {
        return this.getMateriasByMateriaCreate;
    }
}

export default Materias;