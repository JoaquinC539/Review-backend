const joi =require('joi');


const Ticketjoi=joi.object({
    work: joi.string().min(4).max(30).required(),
    status: joi.boolean(),
    comments: joi.string()
});

module.exports=Ticketjoi;