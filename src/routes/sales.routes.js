import {Router} from 'express';
import { getDataSales, postDateSales, postSale, getSales } from '../controllers/sales.controllers.js';
import { getVenEstados } from '../controllers/salecat.controller.js';
const router = Router();

router.get('/', getDataSales)

router.get('/s/:id', getSales)

router.post('/', postSale)

router.delete('/:id', )

router.get('/status', getVenEstados)

router.post('/DataSale', postDateSales)


export default router;
