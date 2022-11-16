'use strict'
//Model for requests
const ContactModel=require("../models/contactModel");
const UserModel=require("../models/usersModel");
const LoginModel=require("../models/loginModel");
//Methods
const controller={
    saveProject:function(req,res){
        var project=new ContactModel();
        var params=req.body;
        project.name=params.name;
        project.last_name=params.last_name;
        project.webpages=params.webs;
        project.email=params.email;
        project.message=params.message;

        project.save((err,store)=>{
            if(err){return res.status(500).send({message:"error en la petición"})};
            if(!store){return res.status(404).send({message:"Metodo no encontardo"})};
            return res.status(200).send({project:store})
        });            
    },
    getUsers:function(req,res){
        UserModel.find().exec((err,users)=>{
            if(err) return res.status(500).send({message:"Error al devolver los datos"});
            return res.status(200).send({users});
        });        
    },
    login:function(req,res){
       var finduser=req.params.user;
       var passwordi=req.params.password;
       var check
       var resultchecked
       LoginModel.findOne({user:finduser},(err,result)=>{
        if(err){return res.status(404).send({message:"El usuario no existe"})};
        if(!result){return res.status(404).send({message:"No se encontro el usuario"})};
        var password=result.password;
        if(password!=passwordi){
            check=false
            res.status(500).send({message:"La contraseña no es correcta",status:false})}
        else{
            check=true;
            res.status(200).send({status:true})
            return resultchecked=check;            
         }    
       });                            
        } 
}
module.exports=controller;