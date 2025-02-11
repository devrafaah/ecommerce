//orquestrar rotas
import express from 'express';
import { userRoutes } from './users.route.js';
import { authRoute } from './auth.route.js';
import { companyRoutes } from './company.route.js';
import { categoryRoute } from './cotegory.route.js';
import { productRoute } from './product.route.js';
import { paymentMethodRoutes } from './payment-method.route.js';
import { orderRoutes } from './order.route.js';
export const routes = (app) => {
    app.use(express.json({ limit: "5mb" }));
    app.use(userRoutes);
    app.use(authRoute);
    app.use(companyRoutes);
    app.use(categoryRoute);
    app.use(productRoute);
    app.use(paymentMethodRoutes);
    app.use(orderRoutes);
};
//# sourceMappingURL=index.js.map