class EvaluacionSQL {
    // definiendo tipo de dato de las consultas
    public getEvaluacion: string;
    public getEvaluacionById: string;
    public insertEvaluacion: string;
    public updateEvaluacion: string;
    public deleteEvaluacion: string;
    public getEvaluacionByEvaluacionCreate: string;
    public getEvaluacionByEvaluacionUpdate: string;    

    // constructor con las consultas
    constructor() {
        this.getEvaluacion = "SELECT * FROM evaluacion ORDER BY evaluacion ASC";
        this.getEvaluacionById = "SELECT * FROM evaluacion WHERE id_evaluacion = ?";
        this.insertEvaluacion = "INSERT INTO evaluacion SET ?";
        this.updateEvaluacion = "UPDATE evaluacion SET ? WHERE id_evaluacion = ?";
        this.deleteEvaluacion = "DELETE FROM evaluacion WHERE id_evaluacion = ?";
        this.getEvaluacionByEvaluacionCreate = "SELECT * FROM evaluacion WHERE evaluacion = ?";
        this.getEvaluacionByEvaluacionUpdate = "SELECT * FROM evaluacion WHERE evaluacion = ? AND id_evaluacion != ?";
    }
    // mostrar todos los datos de las evaluaciones
    getEvaluacionQuery() {return this.getEvaluacion;}
    // msotrar una evaluacion por id
    getEvaluacionByIdQuery() {return this.getEvaluacionById;}
    // registrar una evaluacion
    insertEvaluacionQuery() {return this.insertEvaluacion;}
    // actualizar una evaluacion
    updateEvaluacionQuery() {return this.updateEvaluacion;}
    // eliminar una evaluacion
    deleteEvaluacionQuery() {return this.deleteEvaluacion;}
    // validar si la evaluacion existe
    getEvaluacionByNombreQuery() {return this.getEvaluacionByEvaluacionUpdate;}
    // valiodar si la evaluacion existe
    getEvaluacionByEvaluacionQuery() {return this.getEvaluacionByEvaluacionCreate;}
}

export default new EvaluacionSQL();