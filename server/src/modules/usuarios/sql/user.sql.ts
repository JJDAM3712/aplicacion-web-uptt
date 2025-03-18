class UserQuery {
    getUser: string;
    postUser: string;
    getUserId: string;
    putUser:string;
    existUser: string;
    exsitUserEmail: string;
    repeatUser: string;
    repeatEmail: string;
    deleteUser: string;

    constructor() {
        // mostrar todos los usuarios
        this.getUser = "SELECT * FROM usuarios";
        // mostrar un usuario por id
        this.getUserId = "SELECT * FROM usuarios WHERE id_usuario = ?";
        // registrar un usuario
        this.postUser = "INSERT INTO usuarios SET ?";
        // actualizar un usuario
        this.putUser = "UPDATE usuarios SET ? WHERE id_usuario = ?";
        // validar si existe un usuario
        this.existUser = "SELECT usuario FROM usuarios WHERE usuario = ?";
        // validar si existe un email
        this.exsitUserEmail = "SELECT email FROM usuarios WHERE email = ?";
        // validar usuario repetido
        this.repeatUser = "SELECT usuario FROM usuarios WHERE usuario = ? AND id_usuario != ?";
        // validar email repetido
        this.repeatEmail = "SELECT email FROM usuarios WHERE email = ? AND id_usuario != ?";
        // eliminar un usuario
        this.deleteUser = "DELETE FROM usuarios WHERE id_usuario = ?";
    }

    // mostrar todos los usuarios
    getUserQuery() {return this.getUser}
    // mostrar un usuario por id
    getUserIdQuery() {return this.getUserId}
    // registrar un usuarios
    postUserQuery() {return this.postUser}
    // actualizar un usuario
    putUserQuery() {return this.putUser}
    // validar si existe un usuario
    existUserQuery() {return this.existUser}
    // validar si existe un email
    existUserEmailQuery() {return this.exsitUserEmail}
    // validar usuario repetido
    repeatUserQuery() {return this.repeatUser}
    // validar email repetido
    repeatEmailQuery() {return this.repeatEmail}
    // borrar un usuario
    deleteUserQuery() {return this.deleteUser}

}

export default new UserQuery();