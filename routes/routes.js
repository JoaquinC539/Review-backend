'use strict'
const express=require('express');
//Import controller for methods
const ProjectController=require("../controllers/project");
//Router
var router=express.Router();

router.post("/project",ProjectController.saveProject);

module.exports=router;


