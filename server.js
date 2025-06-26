const express=require('express');
const app=express();
require('dotenv').config();
const mongoose=require("mongoose");

const connectDB=require('./config/ATSDB');

connectDB();



mongoose.connection.once('open',()=>{
    console.log("connected to mongoDB");
    app.listen(process.env.PORT,() => console.log('Server running at http://localhost:3500'));
})
