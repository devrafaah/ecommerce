import express from 'express';
import asyncHandler from 'express-async-handler';
import { AuthController } from '../controllers/auth.controller';
import { celebrate, Segments } from 'celebrate';
import { AuthLoginSchema, AuthRecoverySchema } from '../models/user.model';

export const authRoute = express.Router();

authRoute.post(
    "/auth/login", 
    celebrate({[Segments.BODY]: AuthLoginSchema}), 
    asyncHandler(AuthController.login)
);

authRoute.post(
    "/auth/recovery",
    celebrate({[Segments.BODY] : AuthRecoverySchema}),
    asyncHandler(AuthController.recovery)
)