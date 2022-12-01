'use strict'
const express=require('express');
const controller = require('../controllers/controller');
//Import controller for methods
var ProjectController=require("../controllers/controller");
//Verify JWT token
const verifytoken=require("../middlewares/token-verify")
//Router
var router=express.Router();

router.post("/contact",ProjectController.newContact);
router.get("/users",ProjectController.getFUsers);
router.post("/login",ProjectController.login);
router.get('^/$|index(.html)?',ProjectController.views);
router.post("/signup",controller.createNewuser);
router.get("/dash",verifytoken,controller.dash);
router.post("/newticket",verifytoken,controller.newTicket);
router.put("/updateticket",verifytoken,controller.updateTicket);
router.post("/deleteticket",verifytoken,controller.deleteTicket);
router.get("/tickets",verifytoken,controller.getTickets);

module.exports=router;