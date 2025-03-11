class ProfesorSQL {
    public getProfesor: string;
    public getProfesorById: string;
    public postProfesor: string;
    public getProfesorExist: string;
    public putProfesor: string;
    public getProfesorRepeat: string;
    public deleteProfesor: string;


    constructor() {
        // mostrar todos los estudiantes   
        this.getProfesor = `SELECT * FROM profesores`;
        // mostrar un estudiante por id
        this.getProfesorById = `SELECT * FROM profesores WHERE id_prof = ?`;
        // registrar un estudiante
        this.postProfesor = "INSERT INTO profesores SET ?";
        // validar que el estudiante no exista
        this.getProfesorExist = "SELECT cedula FROM profesores WHERE cedula = ?";
        // actualiazar un estudiante
        this.putProfesor = "UPDATE profesores SET ? WHERE id_prof = ?";
        // valida que el estudiante no este repetido
        this.getProfesorRepeat = "SELECT cedula FROM profesores WHERE cedula = ? AND id_prof != ?";
        // borrar un estudiante
        this.deleteProfesor = "DELETE FROM profesores WHERE id_prof = ?";

    }
    // mostrar todos los estudiantes
    getProfQuery() {return this.getProfesor}
    // mostrar un estudiante por id
    getProfByIdQuery() {return this.getProfesorById}
    // registrar un estudiante
    postProfQuery() {return this.postProfesor}
    // validar que el estudiante no exista
    getProfExistQuery() {return this.getProfesorExist}
    // actualizar un estudiante
      putProfQuery() {return this.putProfesor}
    // validar que el estudiante no este repetido
    getProfRepeatQuery() {return this.getProfesorRepeat}
    // borrar un estudiante
    deleteProfQuery() {return this.deleteProfesor}
}

export default new ProfesorSQL();