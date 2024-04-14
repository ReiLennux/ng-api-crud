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


export const postDateSales = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('idUsuUsuario', sql.Int, req.body.idUsuUsuario)
            .input('strFolio', sql.VarChar, req.body.strFolio)
            .input('dtDate', sql.Date, req.body.dtDate)
            .input('idVenCatState', sql.Int, req.body.idVenCatState)
            .query('INSERT INTO venVenta (idUsuUsuario, strFolio, dtDate, idVenCatState) OUTPUT INSERTED.id VALUES (@idUsuUsuario, @strFolio, @dtDate, @idVenCatState)');

        // Obtener el ID generado
        const insertedId = result.recordset[0].id;
        res.json({ insertedId });
    } catch(error) {
        console.error('Error al realizar la venta:', error);
        res.status(500).json({ error: 'Error al realizar la venta' });
    }
}
