import { getConnection } from "../database/connection.js";
import sql from 'mssql';
import { compare } from '../helpers/handlebcript.js';
import { generarToken } from "../helpers/handleToken.js";

export const login = async (req, res) => {
    const {strName, strPassword }= req.body;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('strName', sql.VarChar, strName)
            .query(`SELECT strPassword FROM UsuUsuarios WHERE strName = @strName`);

        if (result.recordset.length === 0) {
            // El usuario no existe
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const hashPassword = result.recordset[0].strPassword;
        const passwordMatch = await compare(strPassword, hashPassword);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const token = generarToken(strName);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token:token });
    } catch(error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}
