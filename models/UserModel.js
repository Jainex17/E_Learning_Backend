const mongoose = require('mongoose');
const validator = require('validator');
const byrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  
    name:{
        type:String,
        require:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 charaters"],
        minLength:[4,"Name should have more then 4 charaters"]
    },
    email:{
        type:String,
        require:[true,"Please Enter Your Name"],
        unique:true,
        validate:[validator.isEmail,"Please Enter A Valid Email"]
    },
    password:{
        type:String,
        require:[true,"Please Enter Your Password"],
        minLength:[8,"Password should have more then 8 charaters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date
});

userSchema.pre('save',async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await byrypt.hash(this.password,10);
});

// jwt token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

// compare password
userSchema.methods.comparePassword = async function(enterdpassword){
    return await byrypt.compare(enterdpassword,this.password);
};

module.exports = mongoose.model("User",userSchema);