class ProfesorSQL {
    public getProfesorClases: string;
    public getProfesorById: string;
    public postProfesor: string;
    public getClaseExist: string;
    public putClase: string;
    public getProfesorRepeat: string;
    public deleteProfesor: string;
    public deleteClase: string;
    public getClaseBy: string;
    public claseProfNull: string;
    public getClaseOther: string;
    public getProfesor: string;
    public getProfById: string;
    public putClaseExist: string;
    
    // SELECT * FROM usuarios WHERE id_rol = 2 AND id_usuario =

    constructor() {
        // mostrar todos los profesorres con todas sus cases   
        this.getProfesorClases = `SELECT * FROM clases c
                            JOIN usuarios u ON c.id_user = u.id_usuario
                            JOIN materias m ON c.id_materias = m.id_materia
                            JOIN year y ON c.id_anno = y.id_anno
                            JOIN secciones s ON c.id_seccion = s.id_seccion
                            JOIN mensiones mn ON c.id_mension = mn.id_mension
                            ORDER BY u.cedula ASC
                            `;
        // mostrar un profesor y sus clases por id
        this.getProfesorById = `SELECT * 
                                FROM clases c
                                JOIN usuarios u ON c.id_user = u.id_usuario
                                JOIN materias m ON c.id_materias = m.id_materia
                                JOIN year y ON c.id_anno = y.id_anno
                                JOIN secciones s ON c.id_seccion = s.id_seccion
                                JOIN mensiones mn ON c.id_mension = mn.id_mension
                                WHERE c.id_clase = ?`;
        // mostrar una clase para validar que exista
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
        // validar que la clase sea repetida al actualizar
        this.putClaseExist = `SELECT 1 FROM clases
                            WHERE  
                                    id_materias = ?
                                    AND id_seccion = ?
                                    AND id_anno = ?
                                    AND id_mension = ?
                                    AND id_clase != ?
                            LIMIT 1`
        // actualiazar una clase
        this.putClase = `UPDATE clases SET 
                                        id_user = ?, 
                                        id_materias = ?, 
                                        id_seccion = ?, 
                                        id_anno = ?, 
                                        id_mension = ?
                                    WHERE id_clase = ?`;
        // valida que la clase no este repetida
        this.getProfesorRepeat = "SELECT cedula FROM profesores WHERE cedula = ? AND id_prof != ?";
        // borrar una clase
        this.deleteProfesor = "DELETE FROM profesores WHERE id_prof = ?";
        // borrar clase
        this.deleteClase = "DELETE FROM clases WHERE id_clase = ?";
        // cambiar profesor de clase a null
        this.claseProfNull = "UPDATE clases SET id_user = NULL WHERE id_user = ?";
        // mostrar a todos los profesores
        this.getProfesor = "SELECT * FROM usuarios WHERE id_rol = 2";
        // mostrar a un profesor
        this.getProfById = "SELECT * FROM usuarios WHERE id_rol = 2 AND id_usuario = ?";

    }
    // mostrar todos los profesores con sus clases
    getProfClasesQuery() {return this.getProfesorClases}
    // mostrar un profesor y sus clases por id
    getClasesProfByIdQuery() {return this.getProfesorById}
    // mostrar una clase por id
    getClaseByQuery() {return this.getClaseBy}
    // registrar un profesor
    postProfQuery() {return this.postProfesor}
    // validar que el profesor no exista
    getClaseExistQuery() {return this.getClaseExist}
    // actualizar una clase
    putClaseQuery() {return this.putClase}
    // validar que el profesor no este repetido
    getProfRepeatQuery() {return this.getProfesorRepeat}
    // borrar un profesor
    deleteProfQuery() {return this.deleteProfesor}
    // borrar una clase
    deleteClaseQuery() {return this.deleteClase}
    // cambiar prof a null
    profClaseNull() {return this.claseProfNull}
    // validar que una clase la de otro prof
    claseOtherProf() {return this.getClaseOther}
    // mostrar todos los profesores
    showProfesor() {return this.getProfesor}
    // mostrar un profesor
    showProfesorById() {return this.getProfById}
    // validar que la clase sea repetida al actualizar
    putClaseExistQuery() {return this.putClaseExist}
}

export default new ProfesorSQL();