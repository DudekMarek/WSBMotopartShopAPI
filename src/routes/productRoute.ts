import express from 'express';
import * as productController from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/', productController.get);

productRouter.post('/', productController.create);

productRouter.delete('/:id', productController.remove);

productRouter.patch('/:id', productController.update);

export default productRouter;