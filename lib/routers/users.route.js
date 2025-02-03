"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
//middlewere
// arquestrador 
// criador de modulos 
exports.userRoutes = express_1.default.Router();
exports.userRoutes.get("/getusuarios", users_controller_1.UsersController.getAll);
exports.userRoutes.get("/getUsuario/:id", users_controller_1.UsersController.getUserById);
exports.userRoutes.post("/usuario", users_controller_1.UsersController.save);
exports.userRoutes.put("/atualizar/:id", users_controller_1.UsersController.update);
exports.userRoutes.delete("/deletar/:id", users_controller_1.UsersController.delete);
//# sourceMappingURL=users.route.js.map