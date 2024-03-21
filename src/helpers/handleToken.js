import jwt from 'jsonwebtoken';
import  jwtSecret from '../config.js'

export function generarToken(usuario) {
    return jwt.sign({ usuario }, jwtSecret, { expiresIn: '1h' });
}

