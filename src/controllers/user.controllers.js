import { getConnection } from "../database/connection.js";
import sql from 'mssql';
import {encrypt }  from '../helpers/handlebcript.js'

export const getUsers = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM VistaUsuarios');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

export const createUser = async (req, res) => {
    const strPassword = req.body.strPassword
    const hashPassword = await encrypt(strPassword);
    try{
    const pool = await getConnection();
    const result = await pool.request()
    .input('strName', sql.VarChar, req.body.strName)
    .input('strPassword', sql.VarChar, hashPassword)
    .input('idUsuCatTipoUsuario', sql.Int, req.body.idUsuCatTipoUsuario)
    .query(`insert into UsuUsuarios 
    (strName, strPassword, idUsuCatEstadoFK, idUsuCatTipoUsuario) 
    values
    (@strName, @strPassword, 1, @idUsuCatTipoUsuario)`)//cuando es nuevo usuario se activa por defecto

    console.log(result)
    res.status(200).json('Usuario Creado Con éxito')
    }catch(error){
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
}

export const updateUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const strPassword = req.body.strPassword
        const hashPassword = await encrypt(strPassword);
        const pool = await getConnection();
        const result = await pool.request()
        .input('id', sql.Int, userId)
        .input('strName', sql.VarChar, req.body.strName)
        .input('idUsuCatTipoUsuario', sql.Int, req.body.idUsuCatTipoUsuario)
        .input('idUsuCatEstadoFK', sql.Int, req.body.idUsuCatEstadoFK)
        .input('strPassword', sql.VarChar, hashPassword)
        .query(`update usuUsuarios set strName = @strName,
                                        idUsuCatEstadoFK = @idUsuCatEstadoFK,
                                        idUsuCatTipoUsuario = @idUsuCatTipoUsuario,
                                        strPassword = @strPassword
                                        where id = @id`)
        console.log(result)
        res.status(200).json('Usuario Editado Con éxito')
    }catch(err) {
        console.error('Error al editar el usuario:', err);
        res.status(500).json({ error: 'Error al editar el usuario' });
    }
}

export const deleteUser = async (req, res) => {
    try {
        // Validación de entrada
        const usuarioId = req.params.id;
        if (!usuarioId) {
            return res.status(400).json({ error: 'Se requiere el ID del usuario' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('usuarioId', sql.Int, usuarioId)
            .query('DELETE FROM UsuUsuarios WHERE id = @usuarioId');

        // Verifica si se eliminó correctamente
        if (result.rowsAffected[0] === 1) {
            return res.json({ message: 'Usuario eliminado correctamente' });
        } else {
            return res.status(404).json({ error: 'El usuario no fue encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
}
