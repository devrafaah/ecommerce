import express from 'express';
import asyncHandler from 'express-async-handler';
import {celebrate, Segments} from 'celebrate';
import { categoryController } from '../controllers/categories.controller.js';
import { newCategorySchema, updateCategorySchema } from '../models/category.model.js';



export const categoryRoute = express.Router();



categoryRoute.get("/categories/getAll", asyncHandler(categoryController.getAll));
categoryRoute.get("/categories/getById/:id", asyncHandler(categoryController.getById));
categoryRoute.post("/categories/save", celebrate({[Segments.BODY] : newCategorySchema}), asyncHandler(categoryController.save));
categoryRoute.put("/categories/update/:id", celebrate({[Segments.BODY] : updateCategorySchema}),asyncHandler(categoryController.update));
categoryRoute.delete("/categories/delete/:id", asyncHandler(categoryController.delete));