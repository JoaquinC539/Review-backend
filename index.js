'use strict'
const mongoose=require("mongoose");
//Server connection
const app=require('./app');
//Server Create
const port=3000
app.serverCreate(port)
//MongoDB connection
async function main() {
    await mongoose.connect('mongodb://localhost:27017/Review');
    await console.log("DB connection sucess");
}
main().catch(err=>{console.log("Hubo un error",err)})





