import express from 'express';
import { UsersController } from '../controllers/users.controller';


//middlewere
// arquestrador 
// criador de modulos 
export const userRoutes = express.Router();

userRoutes.get("/getusuarios", UsersController.getAll);

userRoutes.get("/getUsuario/:id", UsersController.getUserById);

userRoutes.post("/usuario", UsersController.save);

userRoutes.put("/atualizar/:id", UsersController.update);

userRoutes.delete("/deletar/:id", UsersController.delete);