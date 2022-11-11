'use strict'
const express=require('express');
//Import controller for methods
var ProjectController=require("../controllers/project");
//Router
var router=express.Router();

router.post("/contact",ProjectController.saveProject);

module.exports=router;


