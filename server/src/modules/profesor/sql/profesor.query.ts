class ProfesorSQL {
    public getProfesor: string;
    public getProfesorById: string;
    public postProfesor: string;
    public getClaseExist: string;
    public putProfesor: string;
    public getProfesorRepeat: string;
    public deleteProfesor: string;
    public deleteClase: string;
    public getClaseBy: string;
    public claseProfNull: string;
    public getClaseOther: string;


    constructor() {
        // mostrar todos los profesorres con todas sus cases   
        this.getProfesor = `SELECT * FROM clases c
                            JOIN usuarios u ON c.id_user = u.id_usuario
                            JOIN materias m ON c.id_materias = m.id_materia
                            JOIN year y ON c.id_anno = y.id_anno
                            JOIN secciones s ON c.id_seccion = s.id_seccion
                            JOIN mensiones mn ON c.id_mension = mn.id_mension`;
        // mostrar un profesor y susclases por id
        this.getProfesorById = `SELECT cedula, p_nombre, 
                                s_nombre, p_apellido, s_apellido, telefono, 
                                seccion, mension, anno, id_rol 
                                FROM clases c
                                JOIN usuarios u ON c.id_user = u.id_usuario
                                JOIN materias m ON c.id_materias = m.id_materia
                                JOIN year y ON c.id_anno = y.id_anno
                                JOIN secciones s ON c.id_seccion = s.id_seccion
                                JOIN mensiones mn ON c.id_mension = mn.id_mension
                                WHERE u.id_usuario = ?`;
        // mostrar una clase
        this.getClaseBy = "SELECT * FROM clases WHERE id_clase = ?"
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
        // validar que la clase ya la de otro profesor
        this.getClaseOther = `SELECT 1 FROM clases c
                            WHERE   c.id_materias = ?
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
        // borrar clase
        this.deleteClase = "DELETE FROM clases WHERE id_clase = ?";
        // cambiar profesor de clase a null
        this.claseProfNull = "UPDATE clases SET id_user = NULL WHERE id_user = ?";

    }
    // mostrar todos los estudiantes
    getProfQuery() {return this.getProfesor}
    // mostrar un estudiante por id
    getProfByIdQuery() {return this.getProfesorById}
    // mostrar una clase por id
    getClaseByQuery() {return this.getClaseBy}
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
    // borrar una clase
    deleteClaseQuery() {return this.deleteClase}
    // cambiar prof a null
    profClaseNull() {return this.claseProfNull}
    // validar que una clase la de otro prof
    claseOtherProf() {return this.getClaseOther}
}

export default new ProfesorSQL();