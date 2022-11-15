const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const LoginSchema=Schema({
    user:String,
    password:String
});

module.exports=mongoose.model("Login",LoginSchema);