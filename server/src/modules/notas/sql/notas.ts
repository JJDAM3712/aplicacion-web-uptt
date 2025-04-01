class NotasSQL {
    public getNotas: string;
    public getNotasById: string;
    public postNotas: string;
    public putNotas: string;
    public deleteNotas:string;


    constructor() {
        this.getNotas = 'SELECT * FROM notas';
        this.getNotasById = 'SELECT * FROM notas WHERE id_notas = ?';
        this.postNotas = 'INSERT INTO notas SET ?';
        this.putNotas = 'UPDATE notas SET ? WHERE id_notas = ?';
        this.deleteNotas = 'DELETE FROM notas WHERE id_notas = ?';
    }

    getNotasQuery(){return this.getNotas;}
    getNotasByIdQery() {return this.getNotasById;}
    postNotasQuery() {return this.postNotas;}
    putNotasQuery() {return this.putNotas;}
    deleteNotasQuery() {return this.deleteNotas;}
}

export default new NotasSQL();