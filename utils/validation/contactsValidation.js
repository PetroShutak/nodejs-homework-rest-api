const Joi = require("joi");

const namePattern = /^[\p{Script=Latin}\p{Script=Cyrillic}\s]*$/u;
const phonePattern = /^[0-9 ()+-]+$/;

const schemaCreateContact = Joi.object({
  name: Joi.string().pattern(namePattern).min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().pattern(phonePattern).min(7).max(18).required(),
  favorite: Joi.boolean().optional().default(false),
}).options({ abortEarly: false });

const schemaUpdateContact = Joi.object({
  name: Joi.string().pattern(namePattern).min(3).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string().pattern(phonePattern).min(7).max(18).optional(),
  favorite: Joi.boolean().optional(),
})
  .or("name", "email", "phone", "favorite")
  .options({ abortEarly: false });

module.exports = {
  schemaCreateContact,
  schemaUpdateContact,
};
