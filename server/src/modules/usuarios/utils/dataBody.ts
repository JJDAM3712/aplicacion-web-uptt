class dataBody {
    // datos de usuario
    dataUser = (data: any) => {
        return data = {
            cedula: data.cedula,
            p_nombre: data.p_nombre,
            s_nombre: data.s_nombre,
            p_apellido: data.p_apellido,
            s_apellido: data.s_apellido,
            telefono: data.telefono,
            email: data.email,
            id_rol: data.id_rol
        };
    }
    // datos de profesor
    dataProfesor = (data: any) => {
        return data = {
            id_materias: data.id_materias,
            id_seccion: data.id_seccion,
            id_user: data.id_user
        }
    }
    // datos de estudiante
    dataEstudiante = (data: any) => {
        return data = {
            id_seccion: data.id_seccion,
            id_user: data.id_user,
            id_year: data.id_year
        }
    }
}

export default new dataBody();