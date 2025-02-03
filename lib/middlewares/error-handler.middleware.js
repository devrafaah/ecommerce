"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const internal_server_error_1 = require("../errors/internal-server.error");
const celebrate_1 = require("celebrate");
const base_error_1 = require("../errors/base.error");
const errorHandler = (app) => {
    app.use((0, celebrate_1.errors)());
    app.use((error, req, res, next) => {
        console.log(error);
        if (error instanceof base_error_1.ErrorBase) {
            error.send(res);
        }
        else {
            new internal_server_error_1.InternalServerError().send(res);
        }
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.middleware.js.map