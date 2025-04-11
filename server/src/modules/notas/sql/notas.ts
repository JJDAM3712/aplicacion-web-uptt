class NotasSQL {
    public getNotas: string;
    public getNotasById: string;
    public postNotas: string;
    public putNotas: string;
    public deleteNotas:string;
    public deleteNotasClase: string;


    constructor() {
        this.getNotas = `SELECT *,
                		GROUP_CONCAT(CONCAT(e.evaluacion, " ",n.nota, 'pts') SEPARATOR ', ') AS evaluaciones
                        	FROM notas n
                        		JOIN clases c ON c.id_clase = n.id_clase
                        		JOIN evaluaciones e ON e.id_evaluacion = n.evaluacion
                        		JOIN estudiantes es ON es.id_estudiante = n.estudiante
                        		JOIN usuarios u ON u.id_usuario = es.id_user
                        		JOIN secciones s ON s.id_seccion = c.id_seccion
                        		JOIN year y ON y.id_anno = c.id_anno
                        		JOIN mensiones m ON m.id_mension = c.id_mension
                        		JOIN materias ma ON ma.id_materia = c.id_materias
                        		JOIN lapso l ON l.id_lapso = n.id_lapso
                        		GROUP BY 
                        		   	u.cedula, estudiante, ma.materia, l.lapso, s.seccion, Y.anno, m.mension;`;
        this.getNotasById = 'SELECT * FROM notas WHERE id_notas = ?';
        this.postNotas = 'INSERT INTO notas SET ?';
        this.putNotas = 'UPDATE notas SET ? WHERE id_notas = ?';
        this.deleteNotas = 'DELETE FROM notas';
        this.deleteNotasClase = `DELETE FROM notas WHERE id_clase = ? AND id_lapso = ?;`;
    }

    getNotasQuery(){return this.getNotas;}
    getNotasByIdQery() {return this.getNotasById;}
    postNotasQuery() {return this.postNotas;}
    putNotasQuery() {return this.putNotas;}
    deleteNotasQuery() {return this.deleteNotas;}
    deleteNotasClaseQuery() {return this.deleteNotasClase;}
}

export default new NotasSQL();