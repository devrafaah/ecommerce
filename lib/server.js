"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = require("./routers");
const app_1 = require("firebase-admin/app");
const app_2 = require("firebase/app");
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
const page_not_found_middleware_1 = require("./middlewares/page-not-found.middleware");
const auth_middleware_1 = require("./middlewares/auth.middleware");
(0, app_1.initializeApp)();
(0, app_2.initializeApp)({
    apiKey: process.env.API_KEY
});
const app = (0, express_1.default)();
(0, auth_middleware_1.auth)(app);
(0, routers_1.routes)(app);
(0, page_not_found_middleware_1.pageNotFoundHandler)(app);
(0, error_handler_middleware_1.errorHandler)(app);
app.listen(3000, () => {
    console.log("SERVIDOR NA PORTA 3000");
});
//# sourceMappingURL=server.js.map