import { Router } from 'express';

import categoriesRoutes from './categories.routes';
import specificationRoutes from './specification.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationRoutes);
routes.use('/users', usersRoutes);

export default routes;
