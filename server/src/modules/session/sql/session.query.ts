class SessionSQL {
    passGenerate: string;

    constructor() {
        this.passGenerate = "UPDATE usuarios SET clave = ? WHERE id_usuario = ?";
    }

    passGenerateQuery() {return this.passGenerate;};
}

export default new SessionSQL();