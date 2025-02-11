import express from "express";
import asyncHandler from 'express-async-handler';
import { PaymentMethodController } from "../controllers/payment_method.controller.js";
import { celebrate, Segments } from "celebrate";
import { newPaymentSchema, updatePaymentSchema } from "../models/payment-method.model.js";



export const paymentMethodRoutes = express.Router()


paymentMethodRoutes.get("/payment-method/getAll", asyncHandler(PaymentMethodController.getAll));
paymentMethodRoutes.get("/payment-method/getById/:id", asyncHandler(PaymentMethodController.getById));
paymentMethodRoutes.post("/payment-method/save", celebrate({[Segments.BODY] : newPaymentSchema}),asyncHandler(PaymentMethodController.save));
paymentMethodRoutes.put("/payment-method/update/:id",celebrate({[Segments.BODY] : updatePaymentSchema}) ,asyncHandler(PaymentMethodController.update));
paymentMethodRoutes.delete("/payment-method/delete/:id", asyncHandler(PaymentMethodController.delete));