import { getConnection } from "../database/connection.js";
import sql from 'mssql';


export const getsubcategorias = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM ProCatSubcategorias');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener subcategorias:', error);
        res.status(500).json({ error: 'Error al obtener subcategorias' });
    }
}

export const getCategorias = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM ProCatCategorias');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener categorias:', error);
        res.status(500).json({ error: 'Error al obtener categorias' });
    }
}