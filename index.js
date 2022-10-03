const express=require('express');
const app = express();
const cors=require('cors');

const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

//mongodb

const db=require('./db/connection');
db();

//middleware

app.use(cors());
app.use(express.json());

//using routes
app.use(require('./routes/Route'));

//home function

function home (req,res)
{
    res.send("Welcome to Expense Tracker");
}

//port
const port=process.env.PORT||3000;
app.listen(port,()=>
{
    console.log(`http://localhost:${port}`);
})
