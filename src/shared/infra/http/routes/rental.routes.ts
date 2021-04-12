import { Router } from 'express';

import CreateRentalController from '@modules/rentals/useCases/createRental/CreateRentalController';
import DevolutionRentalController from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import ListRentalsByController from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByController = new ListRentalsByController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);

rentalRoutes.get('/user', ensureAuthenticated, listRentalsByController.handle);

export default rentalRoutes;
