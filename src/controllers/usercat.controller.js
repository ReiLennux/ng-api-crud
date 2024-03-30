import { getConnection } from "../database/connection.js";

export const getTipos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM UsuCatTipoUsuario');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener tipos:', error);
        res.status(500).json({ error: 'Error al obtener tipos' });
    }
};


export const getEstados = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM UsuCatEstadoUsuario');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los estados:', error);
        res.status(500).json({ error: 'Error al obtener  los estados' });
    }
};