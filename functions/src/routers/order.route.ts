import { celebrate, Segments } from 'celebrate';
import express from 'express';
import { newOrderSchema, searchParamsOrderQuerySchema, updateStatusOrderSchema } from '../models/order.model.js';
import AsyncHandler from 'express-async-handler';
import { OrderController } from '../controllers/order.controller.js';



export const orderRoutes = express.Router();


orderRoutes.post("/orders", celebrate({[Segments.BODY] : newOrderSchema}), AsyncHandler(OrderController.save));
orderRoutes.get("/orders", celebrate({[Segments.QUERY] : searchParamsOrderQuerySchema}), AsyncHandler(OrderController.search));
orderRoutes.get("/orders/:id/produtos", AsyncHandler(OrderController.getProdutos));
orderRoutes.get("/orders/:id", AsyncHandler(OrderController.getById));
orderRoutes.post("/orders/:id/status",celebrate({[Segments.BODY] : updateStatusOrderSchema}) ,AsyncHandler(OrderController.updateStatus));