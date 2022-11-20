'use strict'
//Dependencies
require('dotenv').config()
const express=require('express');
const bodyParser=require('body-parser');
const routes=require("./routes/routes");
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors')
const path=require('path');
const corsOptions=require('./config/corsOption');
//cors
app.use(cors(corsOptions));
//middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Server create method
function serverCreate(port){
    app.listen(port,()=>{
        console.log(`Server started at port: ${port}`);
    });
}
//Routes
app.use('/api',express.static(path.join(__dirname,'public')))
app.use('/api',routes)
app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
    res.json({message:"404 Not Found"})
    } else{ res.type('txt').send('404 Not Found')}
})




module.exports={app,serverCreate};