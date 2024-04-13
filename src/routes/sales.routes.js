import {Router} from 'express';
import { getSales } from '../controllers/sales.controllers.js';
import { getVenEstados } from '../controllers/salecat.controller.js';
const router = Router();

router.get('/', getSales)

router.post('/', )

router.delete('/:id', )

router.get('/status', getVenEstados)

export default router;
