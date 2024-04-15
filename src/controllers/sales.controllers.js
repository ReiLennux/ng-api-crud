import { getConnection } from "../database/connection.js";

import sql from 'mssql';

export const getDataSales = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
        select * from venVenta ORDER BY id desc`);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
}

export const getSales =  async (req, res) => {
    try {
        const idVenVenta = req.params.id
        const pool = await getConnection();
        const result = await pool.request()
        .input('idVenVenta', sql.Int, idVenVenta)
        .query(`SELECT * FROM venVentaProducto WHERE idVenVenta = @idVenVenta`);
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
    } catch (error) {
        console.error('Error al realizar la venta:', error);
        res.status(500).json({ error: 'Error al realizar la venta' });
    }
}

export const postSale = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('idVenVenta', sql.Int, req.body.idVenVenta)
            .input('idProProducto', sql.Int, req.body.idProProducto)
            .input('decQuantity', sql.Decimal, req.body.decQuantity)
            .input('decSubtotal', sql.Decimal, req.body.decSubtotal)
            .query('INSERT INTO venVentaProducto (idVenVenta, idProProducto, decQuantity, decSubtotal) VALUES (@idVenVenta, @idProProducto, @decQuantity, @decSubtotal)');

        res.json(result.recordset);
    } catch (error) {
        console.error('Error al realizar la venta:', error);
        res.status(500).json({ error: 'Error al realizar la venta' });
    }
}