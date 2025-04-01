class AnnoSQL {
    // definiendo tipo de dato de las consultas
    public getAnno: string;
    public getAnnoById: string;
    // constructor con las consultas
    constructor() {
        this.getAnno = "SELECT * FROM year";
        this.getAnnoById = "SELECT * FROM year WHERE id_anno = ?";
    }
    // mostrar todos los datos de las año
    getAnnoQuery() {return this.getAnno;}
    // msotrar una año por id
    getAnnoByIdQuery() {return this.getAnnoById;}
}

export default new AnnoSQL();