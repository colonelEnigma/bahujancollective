const Joi = require('joi');

const registrationValidation = async (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        artist: Joi.boolean().optional(),
        writer: Joi.boolean().optional(),
        username: Joi.string().min(3).required(),
        gender: Joi.string().min(2).required(),
        caste: Joi.string().min(2).required(),
        religion: Joi.string().min(2).required(),
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data)
}

module.exports.registrationValidation = registrationValidation
module.exports.loginValidation = loginValidation