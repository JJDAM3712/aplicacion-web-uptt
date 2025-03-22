class SessionSQL {
    passGenerate: string;
    passDuplicate: string;

    constructor() {
        // crear contraseña
        this.passGenerate = "UPDATE usuarios SET clave = ? WHERE id_usuario = ?";
        // buscar contraseña duplicada
        this.passDuplicate = "SELECT clave FROM usuarios WHERE clave = ?";
    }
    // crear contraseña
    passGenerateQuery() {return this.passGenerate;};
    // buscar contraseña duplicada
    passDuplicateQuery() {return this.passDuplicate};
}

export default new SessionSQL();