import express from 'express';
import { CompaniesController } from '../controllers/companies.controller.js';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { newCompanySchema, updateCompanySchema } from '../models/company.model.js';



// arquestrador 
// criador de modulos 
export const companyRoutes = express.Router();

companyRoutes.get("/companies", asyncHandler(CompaniesController.getAll));
companyRoutes.get("/companies/:id", asyncHandler(CompaniesController.getCompanyById));
companyRoutes.post("/companies", celebrate({[Segments.BODY] : newCompanySchema}), asyncHandler(CompaniesController.save));
companyRoutes.put("/companies/:id", celebrate({[Segments.BODY] : updateCompanySchema}),asyncHandler(CompaniesController.update));