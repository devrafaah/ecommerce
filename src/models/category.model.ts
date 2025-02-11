import {Joi} from 'celebrate';

export interface Category {
    id : string,
    descricao : string,
    ativa: boolean,
}


export const newCategorySchema = Joi.object().keys({
    descricao : Joi.string().required(),
    ativa : Joi.boolean().required()
});

export const updateCategorySchema = Joi.object().keys({
    descricao : Joi.string(),
    ativa : Joi.boolean().required()
});