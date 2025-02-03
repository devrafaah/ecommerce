"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const UnAuthorized_error_1 = require("../errors/AuthenticationError/UnAuthorized.error");
const auth_1 = require("firebase-admin/auth");
const user_service_1 = require("../services/user.service");
const forbidden_error_1 = require("../errors/forbidden.error");
const auth = (app) => {
    app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (req.method === "POST" && (req.url.startsWith("/auth/login")) || req.url.startsWith("/auth/recovery")) {
            return next();
        }
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
        if (token) {
            try {
                const decodeIdToken = yield (0, auth_1.getAuth)().verifyIdToken(token, true);
                const user = yield new user_service_1.UserService().getUserById(decodeIdToken.uid);
                if (!user) {
                    return next(new forbidden_error_1.ForbiddenError());
                }
                req.user = user;
                return next();
            }
            catch (error) {
                next(new UnAuthorized_error_1.UnauthorizedError());
            }
        }
        next(new UnAuthorized_error_1.UnauthorizedError());
    }));
};
exports.auth = auth;
//# sourceMappingURL=auth.middleware.js.map