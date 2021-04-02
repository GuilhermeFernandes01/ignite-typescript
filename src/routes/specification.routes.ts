import { Router } from 'express';

import CreateSpecificationController from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationRoutes = Router();

const createSpecificationsController = new CreateSpecificationController();

specificationRoutes.post('/', createSpecificationsController.handle);

export default specificationRoutes;
