import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import carsRoutes from './cars.routes';
import categoriesRoutes from './categories.routes';
import passwordRoutes from './password.routes';
import rentalRoutes from './rental.routes';
import specificationRoutes from './specification.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationRoutes);
routes.use('/users', usersRoutes);
routes.use('/cars', carsRoutes);
routes.use('/rentals', rentalRoutes);
routes.use('/password', passwordRoutes);
routes.use(authenticateRoutes);

export default routes;
