import { Router } from 'express';

import createSpecificationsController from '../modules/cars/useCases/createSpecification';

const specificationRoutes = Router();

specificationRoutes.post('/', (request, response) => {
  return createSpecificationsController.handle(request, response);
});

export default specificationRoutes;
