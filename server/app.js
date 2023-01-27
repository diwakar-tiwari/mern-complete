const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

dotenv.config({path: './config.env'});
require('./db/conn');

app.use(express.json()); //middleware so that application can understand json

//link router file to make routing easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;



//Middleware
const middleware = (req,res,next)=>{
  console.log(`Hello middleware`);
  next();
}

// app.get('/', (req, res) => {
//   res.send('Hello World from app js');
// });

  app.get('/about', middleware, (req, res) => {
    res.send('Hello about World!');
  });
 
  app.get('/contact', (req, res) => {
    res.cookie("Test",'diwakar');
    res.send('Hello contact World!');
  });

  app.get('/signin',(req,res)=>{
    res.send('Hello Login world from the server');
  });

  app.get('/signup', (req,res)=>{
    res.send('Hello Registration world from the server'); 
  })

app.listen(PORT, () => {
  console.log(`Server is runnig at port ${PORT}`);
});  