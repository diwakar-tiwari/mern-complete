const mongoose = require('mongoose');

const DB = process.env.DATABASE

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connection to database is successful");
  }).catch((err) => {
    console.log(`${err} : connection failed!....`);
  });