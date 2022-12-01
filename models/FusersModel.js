const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=Schema({
    id:String,
    name:String,
    last_name:String,
    user:String,
    email:String
});

module.exports=mongoose.model("FUser",userSchema)
