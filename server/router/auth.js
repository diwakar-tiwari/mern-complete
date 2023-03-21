const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello World from auth js");
});

//Using Promises
// router.post('/register', (req,res)=>{

//   const {name, email, phone, work, password, cpassword} = req.body;

//   //validation
//   if(!name ||  !email || !phone || !work || !password || !cpassword){
//      return res.status(422).json({error: "fill all fields"});
//   }

//   //check user already exist or not
//   //left email is database and right one is user data filled email
//   User.findOne({email:email})
//       .then((userExist)=>{
//         if(userExist){
//           return res.status(422).json({error:"email already exist"});
//         }

//       //here name:name, email:email and so on
//       //but in ES6 we can write only one which can match with database
//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(()=>{
//           res.status(201).json({message: "User registered successfully"});
//         }).catch((err)=> res.status(500).json({error: "Failed to registered"}));

//       }).catch(err=> {console.log(err);});

// })

//Using async and await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  //validation
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "fill all fields" });
  }

  try {
    //check user already exist or not
    //left email is database and right one is user data filled email
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "email already exist" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //hashing done at this phase from userSchema.js
      //we are using bcrypt as middleware
      await user.save();

      return res.status(201).json({ message: "User Registered Successfuly" });
    }
  } catch (err) {
    console.log(err);
  }
});

//Login route
router.post("/signin", async (req, res) => {
  // res.send('Hello login world from server');
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (userLogin) {
      //check database and user entered password are same or not
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();//generating at userSchema.js
      console.log(token);

      //store token in cookie
      res.cookie("jwtoken", token,{
        expires: new Date(Date.now() + 25892000000),
        httpOnly:true
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credential" });
      } else {
        res.json({ message: "user signin successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }

    
  } catch (err) {
    console.log(err);
  }
});


//for about us authentication
router.get('/about',authenticate,(req, res) => {
  console.log('Hello about World!');
  res.send(req.rootUser);
});

//get user data for contact us and home page
router.get('/getdata', authenticate, (req,res) =>{
  console.log('Hello my about ');
  res.send(req.rootUser);
})

//contact us page
router.post('/contact', authenticate, async(req,res)=>{
   try {

    const {name, email, phone, message} = req.body;
    

    if(!name || !email || !phone || !message){
      
      console.log('Error in contact form');
      return res.json({error:"Fill the contact form"});
    }

    const userContact = await User.findOne({_id:req.userID});
    

    if(userContact){
      
      const userMessage = await userContact.addMessage(name,email,phone,message);
      

      await userContact.save();
      res.status(201).json({message:"User contact successfully"});
    }else {
      // handle the case where userContact is null or undefined
      console.log("User not found");
      res.status(404).json({error:"User not found"});
    }
   } catch (error) {
      console.log({error:"Error102"});
   }
});

//Logout page
router.get('/logout',(req,res)=>{
    console.log('Hello my logout page');
    res.clearCookie('jwtoken', {path:'/'})
    res.status(200).send('User Logout')
})

module.exports = router;
