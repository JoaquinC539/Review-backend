'use strict'
//Model for requests
const ProjectModel=require("../models/projectModel");
const UserModel=require("../models/usersModel");
const LoginModel=require("../models/loginModel");
//Methods
const controller={
    saveProject:function(req,res){
        var project=new ProjectModel();
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
            if(users==null) return res.status(404).send({message:"No hay proyectos"});
            return res.status(200).send({users});
        });        
    },
    login:function(req,res){
       var finduser=req.params.user;
       var passwordi=req.params.password;
       if(finduser==null) return res.status(404).send({message:"No existe el usuario"});
       if(passwordi==null)return res.status(500).send({message:"La contraseña es obliagatoria"});
       LoginModel.find({user:finduser}).exec(function(err,users){  
        var password=users[0].password;
        if(password===passwordi){
            if(err) return res.status(500).send({message:"Error al devolver los datos"});
            if(users==null) return res.status(404).send({message:"No hay proyectos"});
            return res.status(200).send({users});
        }else{res.status(500).send({message:"La contraseña no es correcta"})}

       })    
                     
        }
    
    
}
module.exports=controller;