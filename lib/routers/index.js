//orquestrar rotas
import express from 'express';
import { userRoutes } from './users.route.js';
import { authRoute } from './auth.route.js';
import { companyRoutes } from './company.route.js';
export const routes = (app) => {
    app.use(express.json({ limit: "5mb" }));
    app.use(userRoutes);
    app.use(authRoute);
    app.use(companyRoutes);
};
//# sourceMappingURL=index.js.map