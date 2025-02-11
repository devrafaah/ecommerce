import { Joi } from "celebrate";
import { phoneRegexPattern } from "../utils/regexs-utils.js";


export interface Customer {
    nome : string,
    telefone : string;
};

export const customerSchema = Joi.object().keys({
    nome : Joi.string().trim().min(5).required(),
    telefone : Joi.string().regex(phoneRegexPattern).required()
})