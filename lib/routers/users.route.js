import express from 'express';
import { UsersController } from '../controllers/users.controller.js';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { AuthUpdateSchema, userSchema } from '../models/user.model.js';
// arquestrador 
// criador de modulos 
export const userRoutes = express.Router();
userRoutes.get("/users/getAll", asyncHandler(UsersController.getAll));
userRoutes.get("/users/getById/:id", asyncHandler(UsersController.getUserById));
userRoutes.post("/users/save", celebrate({ [Segments.BODY]: userSchema }), asyncHandler(UsersController.save));
userRoutes.put("/users/update/:id", celebrate({ [Segments.BODY]: AuthUpdateSchema }), asyncHandler(UsersController.update));
userRoutes.delete("/users/delete/:id", asyncHandler(UsersController.delete));
//# sourceMappingURL=users.route.js.map