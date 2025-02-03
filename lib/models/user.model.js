"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.AuthUpdateSchema = exports.AuthRecoverySchema = exports.AuthLoginSchema = void 0;
const celebrate_1 = require("celebrate");
exports.AuthLoginSchema = celebrate_1.Joi.object().keys({
    email: celebrate_1.Joi.string().email().required(),
    senha: celebrate_1.Joi.string().min(6).required()
});
exports.AuthRecoverySchema = celebrate_1.Joi.object().keys({
    email: celebrate_1.Joi.string().email().required()
});
exports.AuthUpdateSchema = celebrate_1.Joi.object().keys({
    nome: celebrate_1.Joi.string().required(),
    email: celebrate_1.Joi.string().email().required(),
    senha: celebrate_1.Joi.string().min(6)
});
exports.userSchema = celebrate_1.Joi.object().keys({
    nome: celebrate_1.Joi.string().required(),
    email: celebrate_1.Joi.string().email().required(),
    senha: celebrate_1.Joi.string().min(6).required()
});
//# sourceMappingURL=user.model.js.map