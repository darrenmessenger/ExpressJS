import { Router } from "express";
import userRoutes from './users.mjs';
import productsRoutes from './products.mjs';

const routes = Router();

routes.use(userRoutes, productsRoutes);

export default routes;