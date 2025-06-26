const express=require('express');
const app=express();
require('dotenv').config();
const mongoose=require("mongoose");



mongoose.connection.once('open',()=>{
    console.log("connected to mongoDB");
    app.listen(3500,() => console.log('Server running at http://localhost:3500'));
})
