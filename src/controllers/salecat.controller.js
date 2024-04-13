import { getConnection } from "../database/connection.js";

export const getVenEstados = async (req, res) => {
    try{
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM venCatState');
        res.json(result.recordset);
    }catch(error){
        console.error('Error al obtener los estados de venta:', error);
        res.status(500).json({ error: 'Error al obtener  los estados de venta' });
    }
}