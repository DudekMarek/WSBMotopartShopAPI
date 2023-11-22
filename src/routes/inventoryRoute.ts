import express from 'express';
import * as inventoryController from '../controllers/inventoryController';

const inventoryRouter = express.Router();

inventoryRouter.get('/', inventoryController.get);

inventoryRouter.post('/', inventoryController.create);

inventoryRouter.delete('/:id', inventoryController.remove);

inventoryRouter.patch('/:id', inventoryController.update);

export default inventoryRouter;