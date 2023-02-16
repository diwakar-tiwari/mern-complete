const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    work: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    cpassword: {
        type: String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
            name: {
                type: String,
                required:true
            },
            email: {
                type: String,
                required:true
            },
            phone: {
                type: Number,
                required:true
            },
            message: {
                type: String,
                required:true
            },
        }
    ],    
    tokens:[
        {
            token:{
                type: String,
                required:true
            }
        }
    ]
})



//Password hashing
userSchema.pre('save', async function(next){

    console.log('hello from bcrypt');

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        //Push the generated token in schema
        //concat will add the tokenDiwakar to the token in schema
        this.tokens = this.tokens.concat({token:token}); //token:tokenDiwakar
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

//store message from contact us page
userSchema.methods.addMessage = async function(name, email, phone, message){
    try {
        this.messages = this.messages.concat({name, email, phone, message});
        console.log('hello');
        await this.save();
        return this.messages;
    } catch (error) {
        console.log({error:"Error101"});
    }
}



//Link this schema to atlas or connect it to collection
const User = mongoose.model('USER', userSchema);

//as user will be needed everywhere so we will export it
module.exports = User;