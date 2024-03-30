import { Router } from "express";
import { deleteProduct, getProducts } from "../controllers/products.controllers.js";


const router = Router();

router.get('/', getProducts)

router.post('/',)

router.put('/:id',)

router.delete('/:id', deleteProduct)


export default router;