'use strict'
//Modules needed
const path=require('path');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
//Model for requests
const ContactModel=require("../models/Contact/contactModel");
const FUserModel=require("../models/FusersModel");
const UserModel=require("../models/User/User");
const TicketModel=require("../models/Ticket/Ticket")
//Verification of models through joi
const ContactJoi=require("../models/Contact/contactjoi");
const UserJoi=require("../models/User/userjoi");
const LoginJoi=require("../models/Login/loginjoi");
const ticketjoi=require("../models/Ticket/ticketjoi");
//Methods
const controller={
    //Standard api view
    views:function(req,res){
        res.sendFile(path.join(__dirname,'..','views','index.html'));
    },
    //Save contact
    newContact: async function(req,res){
        const {error}=ContactJoi.validate(req.body);
        if(error){return res.status(400).json({error:error.details[0].message})}
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
    //get all fake users
    getFUsers:async function(req,res){
        FUserModel.find().exec((err,users)=>{
            if(err) return res.status(500).send({message:"Error al devolver los datos"});
            return res.status(200).send({users});
        });        
    },

    createNewuser: async function(req,res){
        //Validate information of new user
        const {error}=UserJoi.validate(req.body);
        if(error){return res.status(400).json({error:error.details[0].message})}
        //Check duplicates users
        const duplicate= await UserModel.findOne({email:req.body.email})
        if(duplicate){return res.status(409).send({message:"Ya se encuentra registrado ese email"})}
        //Hash password
        const salt=await bcrypt.genSalt(10);
        const HashedPwd=await bcrypt.hash(req.body.password,salt);
        //Create new User
        const newUser= await new UserModel({
            name:req.body.name,
            email:req.body.email,
            password:HashedPwd
        });
        //Save new user in DB
        try{
                await   newUser.save((err,store)=>{
                if(err){return res.status(500).send({message:"Error en la petición",err})};
                if(!store){return res.status(404).send({message:"Metodo no encontrado"})};
                return res.status(200).json({
                    status:"Usuario creado con la cuenta de: "+store.email
                })
            });    
        } catch{(error)=>{console.log(error),res.send(json.error)}}
        },
    //Login method and send JWT token
     login:async function(req,res){
         //Validate login data
         const{error}=LoginJoi.validate(req.body);
         if(error){ return res.status(400).json({error:error.details[0].message})}
         //Get user
         const user=await UserModel.findOne({email:req.body.email});
         if(!user){return res.status(404).json({error:"El usuario no existe"})}
         //Check password
         const validPassword=await bcrypt.compare(req.body.password,user.password);
         if(!validPassword){return res.status(400).json({error:"La contraseña no es valida o correcta"})}
         //Sign JWT and send it to user
         const token=jwt.sign({
             name: user.name,
             id:user._id,
             email:user.email
         },process.env.TOKEN,{expiresIn:"15m"});
         return res.header('auth-token',token).json({
             error:null,
             data:{token}
         });
    },
    dash: async function(req,res){
        return res.json({
            error:null,
            data:{
                title:"Ruta protegida",
                user:req.user
            },
            message:"Autorizado para otros metodos del backend"
        })
    },   
    newTicket:async function(req,res){
        //Verify information
        const {error}=ticketjoi.validate(req.body);
        if(error){
            return res.status(400).json({error:error.details[0].message});
        }
        //Make new service ticket
        const Ticket=new TicketModel({
            author:req.user.name,
            work:req.body.work,
            status:req.body.status,
            comments:req.body.comments,
        });
        //Save ticket
        try{
           await Ticket.save((err,saved)=>{
                if(err){return res.status(500).send({message:"Error en la petición",err})};
                if(!saved){return res.status(404).send({message:"Metodo no encontrado"})};
                return res.status(200).json({
                    status:"Ticket creado"
                })
            })
        }catch{(error)=>{res.json({message:"Hubo un error",error:error})}}
    },
    getTickets: async function(req,res){
        await TicketModel.find().exec((err,results)=>{
            if(err) {return status(500).send({message:"Error en los datos"})}
            return res.status(200).send({results})            
        })
    },
    updateTicket:async function(req,res){
        try{
            await TicketModel.findOneAndUpdate({_id:req.body._id},{status:Boolean(req.body.status)}).exec((err,sucess)=>{
                if(err){return res.status(500).send({message:"Error en la petición",err})};
                if(!sucess){return res.status(404).send({message:"Metodo no encontrado"})};
                return res.status(200).json({
                    status:"Estado actualizado"
                })  
            })
        }catch{error=>{return res.json({message:"Hubo un error"})}} 
    },
    deleteTicket: async function(req,res){
        try{
            await TicketModel.findByIdAndDelete(req.body._id,(err,sucess)=>{
                if(err){return res.status(500).send({message:"Ticket no encontrado"})};
                if(!sucess){return res.status(404).send({message:"Metodo no encontrado"})};
                return res.status(200).json({
                    status:"Ticket eliminado"
                })     
            })
        }catch{(err)=>{return res.json({status:err})}}
    }
}
module.exports=controller;