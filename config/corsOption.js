const allowedOrigin=require('./allowdOrigins');

const corsOption={
    origin:(origin,callback)=>{
        if(allowedOrigin.indexOf(origin)===-1||!origin){
            callback(null,true)            
        }else{callback(new Error("Not allowed by cors"))}
    },
    credentials:true,
    optionsSuccessStatus:200
}
module.exports=corsOption;