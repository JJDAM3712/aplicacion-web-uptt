class EstudiantesSQL {
    public getStudent: string;
    public getStudentById: string;
    public postStudent: string;
    public getStudenExist: string;
    public putStudent: string;
    public getStudentRepeat: string;
    public deleteStudent: string;
    public userIsEstudent: string;

    constructor() {
        // mostrar todos los estudiantes   
        this.getStudent = `SELECT *
                            FROM estudiantes al
                            JOIN usuarios u ON al.id_user = u.id_usuario
                            JOIN year y ON al.id_year = y.id_anno
                            JOIN secciones s ON al.id_seccion = s.id_seccion
                            JOIN mensiones m ON al.id_mension = m.id_mension
                            WHERE (? IS NULL OR y.anno = ?)
                                    AND (? IS NULL OR s.seccion = ?)
                                    AND (? IS NULL OR m.mension = ?)
                                    ORDER BY u.cedula ASC`;
        // mostrar un estudiante por id
        this.getStudentById = `SELECT * 
                  				FROM usuarios
                                LEFT JOIN estudiantes ON estudiantes.id_user = usuarios.id_usuario
                  				LEFT JOIN secciones ON secciones.id_seccion = estudiantes.id_seccion
                  				LEFT JOIN mensiones ON mensiones.id_mension = estudiantes.id_mension
                  				LEFT JOIN year ON year.id_anno = estudiantes.id_year WHERE id_usuario = ?`;
        // registrar un estudiante
        this.postStudent = "INSERT INTO estudiantes SET ?";
        // validar que el estudiante no exista
        this.getStudenExist = "SELECT cedula FROM usuarios WHERE cedula = ?";
        // actualiazar un estudiante
        this.putStudent = "UPDATE estudiantes SET ? WHERE id_user = ?";
        // valida que el estudiante no este repetido
        this.getStudentRepeat = "SELECT cedula FROM usuarios WHERE cedula = ? AND id_usuario != ?";
        // borrar un estudiante
        this.deleteStudent = "DELETE FROM estudiantes WHERE id_user = ?";
        // validar que un usuario sea estudiante
        this.userIsEstudent = `SELECT p_nombre FROM usuarios us 
                            JOIN estudiantes es ON us.id_usuario = es.id_user 
                            WHERE id_usuario = ?`;
    }
    // mostrar todos los estudiantes
    getEstudiantesQuery() {return this.getStudent}
    // mostrar un estudiante por id
    getEstudianteByIdQuery() {return this.getStudentById}
    // registrar un estudiante
    postEstudianteQuery() {return this.postStudent}
    // validar que el estudiante no exista
    getEstudianteExistQuery() {return this.getStudenExist}
    // actualizar un estudiante
    putEstudianteQuery() {return this.putStudent}
    // validar que el estudiante no este repetido
    getEstudianteRepeatQuery() {return this.getStudentRepeat}
    // borrar un estudiante
    deleteEstudianteQuery() {return this.deleteStudent}
    // validar que un usuario sea un alumno
    UserIsAlumno() {return this.userIsEstudent}
}

export default new EstudiantesSQL();