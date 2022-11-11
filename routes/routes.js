'use strict'
const express=require('express');
//Import controller for methods
const ProjectController=require("../controllers/project");
//Router
var router=express.Router();
router.get("/home",ProjectController.home);
router.post("/test",ProjectController.test);
router.post("/project",ProjectController.saveProject);

module.exports=router;


