import { Router } from 'express';

import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';

const carsRoutes = Router();

const createSpecificationsController = new CreateCarController();

carsRoutes.post('/', createSpecificationsController.handle);

export default carsRoutes;
