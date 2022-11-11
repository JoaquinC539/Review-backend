'use strict'
const express=require('express');
const bodyParser=require('body-parser');
const routes=require("./routes/routes");
var app=express();
//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Server create method
function serverCreate(port){
    app.listen(port,()=>{
        console.log(`Server started at localhost:${port}`);
    });
}
//Routes
app.use("/api",routes);




module.exports={app,serverCreate};