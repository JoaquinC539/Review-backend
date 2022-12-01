'use strict'
const joi=require("joi");

const schemaContact=joi.object({
    name:joi.string().min(4).max(35).required(),
    last_name:joi.string().min(4).max(35).required(),
    message:joi.string().min(5).max(255).required(),
    webs:joi.string().allow(null,"").optional(),
    email:joi.string().min(6).max(40).email().required()
})

module.exports=schemaContact