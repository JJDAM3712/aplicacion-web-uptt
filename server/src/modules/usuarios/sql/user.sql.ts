class UserQuery {
    getUser: string;
    postUser: string;
    getUserId: string;
    putUser:string;

    constructor() {
        // mostrar todos los usuarios
        this.getUser = "SELECT * FROM usuarios";
        // mostrar un usuario por id
        this.getUserId = "SELECT * FROM usuarios WHERE id_usuario = ?";
        // registrar un usuario
        this.postUser = "INSERT INTO usuarios SET ?";
        // actualizar un usuario
        this.putUser = "UPDATE usuarios SET ? WHERE id_usuario = ?";
    }

    // mostrar todos los usuarios
    getUserQuery() {return this.getUser}
    // mostrar un usuario por id
    getUserIdQuery() {return this.getUserId}
    // registrar un usuarios
    postUserQuery() {return this.postUser}
    // actualizar un usuario
    putUserQuery() {return this.putUser}

}

export default new UserQuery();