import { celebrate, Segments } from 'celebrate';
import express from 'express';
import { newOrderSchema, searchParamsOrderQuerySchema } from '../models/order.model.js';
import AsyncHandler from 'express-async-handler';
import { OrderController } from '../controllers/order.controller.js';



export const orderRoutes = express.Router();


orderRoutes.post("/orders", celebrate({[Segments.BODY] : newOrderSchema}), AsyncHandler(OrderController.save));
orderRoutes.get("/orders", celebrate({[Segments.QUERY] : searchParamsOrderQuerySchema}), AsyncHandler(OrderController.search));