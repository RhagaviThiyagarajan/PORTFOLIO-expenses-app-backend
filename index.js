const express=require('express');
const app = express();
const cors=require('cors');
const authRoute=require('./routes/auth.js');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

//mongodb

const db=require('./db/connection');
db();

//middleware



app.use(cors({
    origin:"*",
    credentials:true
  }));
app.use(express.json());

//using routes
app.use(require('./routes/Route'));

app.get('/',(req,res)=>
{
    res.status(200).send('WELCOME TO EXPENSES TRACKER APPLICATION');
});


//middleware
app.use('/auth',authRoute);
//port
const port=process.env.PORT||3000;
app.listen(port,()=>
{
    console.log(`http://localhost:${port}`);
})