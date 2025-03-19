class UserQuery {
    getUser: string;
    postUser: string;
    getUserId: string;
    putUser:string;
    existUser: string;
    repeatUser: string;
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
        this.existUser = "SELECT usuario, email FROM usuarios WHERE (usuario = ? OR email = ?)";
        // usuario y email repetido
        this.repeatUser = "SELECT usuario, email FROM usuarios WHERE (usuario = ? OR email = ?) AND id_usuario != ?";
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
    // validar usuario repetido
    repeatUserQuery() {return this.repeatUser}
    // borrar un usuario
    deleteUserQuery() {return this.deleteUser}

}

export default new UserQuery();