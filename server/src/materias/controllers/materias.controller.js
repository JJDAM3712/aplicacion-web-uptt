import { pool } from "../../database/db.js";
import Materias from "../querys/materias.js";

const materias = new Materias();


// mostrar todos los datos de las materias
export const getMaterias = async (req, res) => {
    try {
        const sql = materias.getMateriasQuery();
        const [result] = await pool.query(sql);
        res.json(result);
    } catch (error) {
        console.error(error);
    }
}

// mostrar una materia por id
export const getMateriaById = async (req, res) => {
    try {
        const sql = materias.getMateriasByIdQuery();
        const [result] = await pool.query(sql, [req.params.id]);

        // valida que la materia exista
        if(result.length == 0) {
            return res.status(404).json({ message: "Materia no encontrada" });
        }
        
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ message: "Error al buscar la materia" });
    }
}  

// insertar una materia
export const postMaterias = async (req, res) => {
    try {
        const {materia, descripcion} = req.body;
        const sql = materias.insertMateriasQuery();
        const sql1 = materias.getMateriasByNombreQuery();

        // valida que la materia no exista
        const [result1] = await pool.query(sql1, req.body.materia);
        if (result1.length > 0) {
            return res.status(409).json({ message: "La materia ya existe" });
        }

        const [result] = await pool.query(sql, req.body);

        return res.status(200).json({ message: "Materia insertada correctamente" , data: result });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al insertar la materia" });
    }
}

// actualizar una materia
export const putMaterias = async (req, res) => {
    try {
        const {materia, descripcion} = req.body;
        const sql = materias.updateMateriasQuery();
        const sql1 = materias.getMateriasByMateriaQuery();
        const sql2 = materias.getMateriasByIdQuery();

        // valida que la materia exista
        const [result2] = await pool.query(sql2, req.params.id);
        if (result2.length == 0) {
            return res.status(404).json({ message: "Materia no encontrada" });
        }
        // valida que la materia no este repetida
        const [result1] = await pool.query(sql1, [req.body.materia, req.params.id]);
        if (result1.length > 0) {
            return res.status(409).json({ message: "La materia ya existe" });
        }

        const [result] = await pool.query(sql, [req.body, req.params.id]);

        return res.status(200).json({ message: "Materia actualizada correctamente" , data: result });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al actualizar la materia" });
    }
}

// eliminar una materia
export const deleteMaterias = async (req, res) => {
    try {
        const sql = materias.deleteMateriasQuery();
        const sql1 = materias.getMateriasByIdQuery();

        // valida que la materia exista
        const [result1] = await pool.query(sql1, req.params.id);
        if (result1.length == 0) {
            return res.status(404).json({ message: "Materia no encontrada" });
        }

        const [result] = await pool.query(sql, req.params.id);

        return res.status(200).json({ message: "Materia eliminada correctamente" , data: result });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al eliminar la materia" });
    }
}