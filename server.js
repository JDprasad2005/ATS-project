const express=require('express');
const app=express();
require('dotenv').config();
const mongoose=require("mongoose");
const cors=require('cors');
const connectDB=require('./config/ATSDB');
const cookieParser = require('cookie-parser');

connectDB();


app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/authRoutes'));


mongoose.connection.once('open',()=>{
    console.log("connected to mongoDB");
    app.listen(process.env.PORT,() => console.log('Server running at http://localhost:5000'));
});
