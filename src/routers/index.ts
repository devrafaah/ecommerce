//orquestrar rotas
import express from 'express';
import { userRoutes } from './users.route';
import { authRoute } from './auth.route';



export const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(userRoutes);
    app.use(authRoute);
}