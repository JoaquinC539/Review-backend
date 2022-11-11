'use strict'
//Model for post requests
const ProjectModel=require("../models/projectModel");
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

      
    }
}
module.exports=controller;