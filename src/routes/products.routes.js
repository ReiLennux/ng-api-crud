import { Router } from "express";
import { deleteProduct, getProducts, updateProduct } from "../controllers/products.controllers.js";
import { getsubcategorias, getCategorias } from "../controllers/productcat.controller.js";

const router = Router();

router.get('/', getProducts)

router.post('/',)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

router.get('/subcategorias', getsubcategorias)
router.get('/categorias', getCategorias)

export default router;