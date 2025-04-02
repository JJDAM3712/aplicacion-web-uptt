class LapsoSQL {
    public getLapso: string;
    public getLapsoById: string;

    constructor() {
        this.getLapso = "SELECT * FROM lapso";
        this.getLapsoById = "SELECT * FROM lapso WHERE id_lapso = ?";
    }
    getLapsoQuery() {return this.getLapso}
    getLapsoByIdQuery() {return this.getLapsoById}
}

export default new LapsoSQL();