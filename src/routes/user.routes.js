import {Router} from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/user.controllers.js';
import { getEstados, getTipos } from '../controllers/usercat.controller.js';

const router = Router()


router.get('/', getUsers)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

router.get('/tipos', getTipos)

router.get('/estados', getEstados)


export default router;