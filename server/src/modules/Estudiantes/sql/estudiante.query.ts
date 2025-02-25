class EstudiantesSQL {
    public getStudent: string;
    public getStudentById: string;


    constructor() {
        // mostrar todos los estudiantes   
        this.getStudent = "SELECT * FROM estudiantes";
        // mostrar un estudiante por id
        this.getStudentById = "SELECT * FROM estudiantes WHERE id_estudiante = ?";
    }
    // mostrar todos los estudiantes
    getEstudiantesQuery() {return this.getStudent}
    // mostrar un estudiante por id
    getEstudianteByIdQuery() {return this.getStudentById}
}

export default new EstudiantesSQL();