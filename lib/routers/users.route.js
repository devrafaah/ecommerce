"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const celebrate_1 = require("celebrate");
const user_model_1 = require("../models/user.model");
// arquestrador 
// criador de modulos 
exports.userRoutes = express_1.default.Router();
exports.userRoutes.get("/getusuarios", (0, express_async_handler_1.default)(users_controller_1.UsersController.getAll));
exports.userRoutes.get("/getUsuario/:id", (0, express_async_handler_1.default)(users_controller_1.UsersController.getUserById));
exports.userRoutes.post("/usuario", (0, celebrate_1.celebrate)({ [celebrate_1.Segments.BODY]: user_model_1.userSchema }), (0, express_async_handler_1.default)(users_controller_1.UsersController.save));
exports.userRoutes.put("/atualizar/:id", (0, celebrate_1.celebrate)({ [celebrate_1.Segments.BODY]: user_model_1.AuthUpdateSchema }), (0, express_async_handler_1.default)(users_controller_1.UsersController.update));
exports.userRoutes.delete("/deletar/:id", (0, express_async_handler_1.default)(users_controller_1.UsersController.delete));
//# sourceMappingURL=users.route.js.map