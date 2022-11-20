'use strict'
require('dotenv').config()
const connectDB=require('./config/dbCon')
const mongoose=require("mongoose");
//Server connection
const app=require('./app');
//Connection to
console.log(process.env.NODE_ENV)
//Define Port
const PORT=process.env.PORT || 3000
//MongoDB connection
connectDB();
mongoose.connection.once('open',()=>{
    console.log("MongoDB connection successful ",);
//Server creation once DB is up
    app.serverCreate(PORT)
})

//Catch error in DB
mongoose.connection.on("error",err=>{console.log("Hubo un error: ",err)})




