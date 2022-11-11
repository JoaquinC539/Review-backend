'use strict'
const express=require('express');
const bodyParser=require('body-parser');
const routes=require("./routes/routes");
var app=express();
//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//Server create method
function serverCreate(port){
    app.listen(port,()=>{
        console.log(`Server started at localhost:${port}`);
    });
}
//Routes
app.use("/api",routes);




module.exports={app,serverCreate};