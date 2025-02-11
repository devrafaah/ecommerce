import express from 'express';
import asyncHandler from 'express-async-handler';
import {celebrate, Segments} from 'celebrate'
import { productsController } from '../controllers/products.controller.js';
import { newProductSchema, searchProductSchema, updateProductSchema } from '../models/product.model.js';


export const productRoute = express.Router();



productRoute.get("/products/getAll", asyncHandler(productsController.getAll));
productRoute.get("/products/search",celebrate({[Segments.QUERY] : searchProductSchema}) ,asyncHandler(productsController.search));
productRoute.get("/products/getById/:id", asyncHandler(productsController.getById));
productRoute.post("/products/save", celebrate({[Segments.BODY] : newProductSchema}),asyncHandler(productsController.save));
productRoute.put("/products/update/:id",celebrate({[Segments.BODY] : updateProductSchema}),asyncHandler(productsController.update));
productRoute.delete("/products/delete/:id", asyncHandler(productsController.delete));
