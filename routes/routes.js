'use strict'
const express=require('express');
//Import controller for methods
var ProjectController=require("../controllers/project");
//Router
var router=express.Router();

router.post("/contact",ProjectController.saveProject);
router.get("/users",ProjectController.getUsers);
router.post("/login",ProjectController.login);
router.get('^/$|index(.html)?',ProjectController.views);


module.exports=router;