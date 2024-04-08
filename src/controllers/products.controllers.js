import { getConnection } from "../database/connection.js";
import sql from 'mssql';


export const getProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM ProProductos');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}

export const createProduct = async (req, res) => {
    try {
        
    }catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({ error: 'Se requiere el ID del producto' });
        }
        const pool = await getConnection();
        const result = await pool.request()
        .input('productId', sql.Int, productId)
        .query('DELETE FROM ProProductos WHERE id = @productId');

        // Verifica si se eliminó correctamente
        if (result.rowsAffected[0] === 1) {
            return res.json({ message: 'Producto eliminado correctamente' });
        } else {
            return res.status(404).json({ error: 'El producto no fue encontrado' });
        }
    }catch(error){
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
}



export const updateProduct = async (req, res) => {
    try{
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({ error: 'Se requiere el ID del producto' });
        }
        const pool = await getConnection();
        const result = await pool.request()
        .input('productId', sql.Int, productId)
        .input('strName', sql.VarChar, req.body.strName)
        .input('strDescription', sql.VarChar, req.body.strDescription)
        .input('idCatCategoria', sql.Int, req.body.idCatCategoria)
        .input('idCatSubcategoria', sql.Int, req.body.idCatSubcategoria)
        .input('decMinimum', sql.Float, req.body.decMinimum)
        .input('decMaximum', sql.Float, req.body.decMaximum)
        .input('decStock', sql.Float, req.body.decStock)
        .input('decCost', sql.Float, req.body.decCost)
        .input('decPrice', sql.Float, req.body.decPrice)
        .input('strImage', sql.VarChar, req.body.strImage)
        .query(`UPDATE ProProductos SET strName = @strName,
                                        strDescription = @strDescription, 
                                        idCatCategoria = @idCatCategoria,
                                        idCatSubcategoria = @idCatSubcategoria,
                                        decMinimum = @decMinimum,
                                        decMaximum = @decMaximum,
                                        decStock = @decStock,
                                        decCost = @decCost,
                                        decPrice = @decPrice,
                                        strImage = @strImage
                                        WHERE id = @productId`);
        // Verifica si se eliminó correctamente
        if (result.rowsAffected[0] === 1) {
            return res.json({ message: 'Producto actualizado correctamente' });
        } else {
            return res.status(404).json({ error: 'El producto no fue encontrado' });
        }
    }catch(error){
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
}