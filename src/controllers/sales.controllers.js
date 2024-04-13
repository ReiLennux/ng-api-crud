import { getConnection } from "../database/connection.js";

import sql from 'mssql';

export const getSales = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM venVentaProducto as vp
                                                    INNER JOIN venVenta as v on vp.idVenVenta = v.id`);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }

}


export const postSales = async (req, res) => {
    try{
        const pool = await getConnection();
        const result = await pool.request()
        .input('idVenVenta', sql.Int, req.body.idVenVenta)
        .input('idVenProducto', sql.Int, req.body.idVenProducto)
        .input('idVenCantidad', sql.Int, req.body.idVenCantidad)
        
    }catch(error){
        console.error('Error al realizar la ventas:', error);
        res.status(500).json({ error: 'Error al realizar la ventas' });
    }
}