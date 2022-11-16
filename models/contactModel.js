'use strict'
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const projectSchema=Schema({
    name:String,
    last_name:String,
    email:String,
    webpages:[String],
    message:String

});

module.exports=mongoose.model("Contact",projectSchema);