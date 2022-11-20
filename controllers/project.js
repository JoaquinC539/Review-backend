'use strict'
//Model for requests
const ContactModel=require("../models/contactModel");
const UserModel=require("../models/usersModel");
const LoginModel=require("../models/loginModel");
const path=require('path');
const brcrypt=require('bcrypt');
//Methods
const controller={
    saveProject: async function(req,res){
        var project=new ContactModel();
        var params=req.body;
        project.name=params.name;
        project.last_name=params.last_name;
        project.webpages=params.webs;
        project.email=params.email;
        project.message=params.message;
        project.save((err,store)=>{
            if(err){return res.status(500).send({message:"error en la petición",err})};
            if(!store){return res.status(404).send({message:"Metodo no encontardo"})};
            return res.status(200).send({project:store})
        });            
    },
    getUsers:async function(req,res){
        UserModel.find().exec((err,users)=>{
            if(err) return res.status(500).send({message:"Error al devolver los datos"});
            return res.status(200).send({users});
        });        
    },
     login:async function(req,res){
        var params=req.body;
        LoginModel.findOne({user:req.body.user},(err,result)=>{
            if(err){return res.status(404).send({message:"El usuario no existe"})}
            if(!result){return res.status(404).send({message:"El usuario no existe"})}
            if(result.password!=params.password){return res.status(500).send({message:"La contraseña no es correcta"})}
            else{ return res.status(200).send({status:true})}
        });
    },
        views:function(req,res){
            res.sendFile(path.join(__dirname,'..','views','index.html'));
    },
/*
    createlogin: async function(req,res){
        const {username, password}=req.body
            //Confirm data
        if(!username || !password){return res.status(400).send({message:"Al fields are required"})}
            //Check duplicates
        const duplicate = await User.findOne({usernae}).lean().exec()
        if(duplicate){return res.status(409).send({message:"Duplicate username"})}
        const hashpwd=await brcrypt.hash(password,10);
        const userObject={username,"password":hashpwd}
        const user=await User.create(userObject);
        if(user){
            res.status(201).send({message:`Nuevo usuario: ${username} creado`})
        }else{
            res.status(404).send({message:"Información invalida"})
        }
        }*/
}
module.exports=controller;