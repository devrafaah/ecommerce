"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
//orquestrar rotas
const express_1 = __importDefault(require("express"));
const users_route_1 = require("./users.route");
const routes = (app) => {
    app.use(express_1.default.json());
    app.use(users_route_1.userRoutes);
};
exports.routes = routes;
//# sourceMappingURL=index.js.map