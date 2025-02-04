import express from 'express';
import { UsersController } from '../controllers/users.controller.js';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { AuthUpdateSchema, userSchema } from '../models/user.model.js';
// arquestrador 
// criador de modulos 
export const userRoutes = express.Router();
userRoutes.get("/getusuarios", asyncHandler(UsersController.getAll));
userRoutes.get("/getUsuario/:id", asyncHandler(UsersController.getUserById));
userRoutes.post("/usuario", celebrate({ [Segments.BODY]: userSchema }), asyncHandler(UsersController.save));
userRoutes.put("/atualizar/:id", celebrate({ [Segments.BODY]: AuthUpdateSchema }), asyncHandler(UsersController.update));
userRoutes.delete("/deletar/:id", asyncHandler(UsersController.delete));
//# sourceMappingURL=users.route.js.map