class EstudiantesSQL {
    public getStudent: string;
    public getStudentById: string;
    public postStudent: string;
    public getStudenExist: string;
    public putStudent: string;
    public getStudentRepeat: string;
    public deleteStudent: string;


    constructor() {
        // mostrar todos los estudiantes   
        this.getStudent = `SELECT cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, foto_perfil, seccion, mension, anno 
                  				FROM estudiantes
                  				LEFT JOIN secciones ON secciones.id_seccion = estudiantes.id_seccion
                  				LEFT JOIN mensiones ON mensiones.id_mension = secciones.id_mension
                  				LEFT JOIN year ON year.id_anno = estudiantes.id_year`;
        // mostrar un estudiante por id
        this.getStudentById = `SELECT cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, foto_perfil, seccion, mension, anno 
                  				FROM estudiantes
                  				LEFT JOIN secciones ON secciones.id_seccion = estudiantes.id_seccion
                  				LEFT JOIN mensiones ON mensiones.id_mension = secciones.id_mension
                  				LEFT JOIN year ON year.id_anno = estudiantes.id_year WHERE id_estudiante = ?`;
        // registrar un estudiante
        this.postStudent = "INSERT INTO estudiantes SET ?";
        // validar que el estudiante no exista
        this.getStudenExist = "SELECT cedula FROM estudiantes WHERE cedula = ?";
        // actualiazar un estudiante
        this.putStudent = "UPDATE estudiantes SET ? WHERE id_estudiante = ?";
        // valida que el estudiante no este repetido
        this.getStudentRepeat = "SELECT cedula FROM estudiantes WHERE cedula = ? AND id_estudiante != ?";
        // borrar un estudiante
        this.deleteStudent = "DELETE FROM estudiantes WHERE id_estudiante = ?";

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
}

export default new EstudiantesSQL();