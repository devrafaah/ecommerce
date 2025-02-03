import { Joi } from "celebrate";

export interface User {
    id : string,
    nome : string,
    email : string,
    senha? : string,
}
export const AuthLoginSchema = Joi.object().keys({
    email : Joi.string().email().required(),
    senha : Joi.string().min(6).required()
});

export const AuthRecoverySchema = Joi.object().keys({
    email : Joi.string().email().required()
});

export const AuthUpdateSchema = Joi.object().keys({
    nome : Joi.string().required(),
    email : Joi.string().email().required(),
    senha : Joi.string().min(6)
});

export const userSchema = Joi.object().keys({
    nome : Joi.string().required(),
    email : Joi.string().email().required(),
    senha : Joi.string().min(6).required()
});