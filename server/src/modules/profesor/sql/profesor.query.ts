class ProfesorSQL {
    public getProfesor: string;
    public getProfesorById: string;
    public postProfesor: string;
    public getClaseExist: string;
    public putProfesor: string;
    public getProfesorRepeat: string;
    public deleteProfesor: string;


    constructor() {
        // mostrar todos los estudiantes   
        this.getProfesor = `SELECT * FROM clases c
                            JOIN usuarios u ON c.id_user = u.id_usuario
                            JOIN materias m ON c.id_materias = m.id_materia
                            JOIN year y ON c.id_anno = y.id_anno
                            JOIN secciones s ON c.id_seccion = s.id_seccion
                            JOIN mensiones mn ON c.id_mension = mn.id_mension`;
        // mostrar un estudiante por id
        this.getProfesorById = `SELECT * FROM clases c
                            JOIN usuarios u ON c.id_user = u.id_usuario
                            JOIN materias m ON c.id_materias = m.id_materia
                            JOIN year y ON c.id_anno = y.id_anno
                            JOIN secciones s ON c.id_seccion = s.id_seccion
                            JOIN mensiones mn ON c.id_mension = mn.id_mension
                            WHERE u.id_usuario = ?`;
        // registrar una clase para el profesor
        this.postProfesor = "INSERT INTO clases SET ?";
        
        // validar que la clase no exista
        this.getClaseExist = `SELECT 1 FROM clases c
                            WHERE c.id_user = ?
                                   AND c.id_materias = ?
                                   AND c.id_seccion = ?
                                   AND c.id_anno = ?
                                   AND c.id_mension = ?
                            LIMIT 1`;
        // actualiazar un estudiante
        this.putProfesor = "UPDATE profesores SET ? WHERE id_prof = ?";
        // valida que la clase no este repetida
        this.getProfesorRepeat = "SELECT cedula FROM profesores WHERE cedula = ? AND id_prof != ?";
        // borrar una clase
        this.deleteProfesor = "DELETE FROM profesores WHERE id_prof = ?";

    }
    // mostrar todos los estudiantes
    getProfQuery() {return this.getProfesor}
    // mostrar un estudiante por id
    getProfByIdQuery() {return this.getProfesorById}
    // registrar un estudiante
    postProfQuery() {return this.postProfesor}
    // validar que el estudiante no exista
    getClaseExistQuery() {return this.getClaseExist}
    // actualizar un estudiante
    putProfQuery() {return this.putProfesor}
    // validar que el estudiante no este repetido
    getProfRepeatQuery() {return this.getProfesorRepeat}
    // borrar un estudiante
    deleteProfQuery() {return this.deleteProfesor}
}

export default new ProfesorSQL();