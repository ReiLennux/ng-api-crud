import {Router} from 'express';
import { getDataSales, postDateSales, postSale, getSale, deleteSale, putSale } from '../controllers/sales.controllers.js';
import { getVenEstados } from '../controllers/salecat.controller.js';
const router = Router();

router.get('/', getDataSales)

router.get('/s/:id', getSale)

router.post('/', postSale)

router.delete('/:id', deleteSale )

router.get('/status', getVenEstados)

router.post('/DataSale', postDateSales)

router.put('/su/:id', putSale)

export default router;
