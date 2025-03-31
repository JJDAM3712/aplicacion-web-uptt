class SessionSQL {
    passGenerate: string;
    passDuplicate: string;
    loginDate: string;

    constructor() {
        // crear contraseña
        this.passGenerate = "UPDATE usuarios SET clave = ? WHERE id_usuario = ?";
        // buscar contraseña duplicada
        this.passDuplicate = "SELECT clave FROM usuarios WHERE BINARY clave = ?";
        // login
        this.loginDate = "SELECT id_usuario, cedula, clave, id_rol FROM usuarios WHERE BINARY cedula = ?"
    }
    // crear contraseña
    passGenerateQuery() {return this.passGenerate;};
    // buscar contraseña duplicada
    passDuplicateQuery() {return this.passDuplicate};
    // login
    loginDateQuery() {return this.loginDate};
}

export default new SessionSQL();