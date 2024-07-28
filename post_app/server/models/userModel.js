const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,"add a name"],
        trim:true,
    },
    email:{
        type: String,
        required:[true,"add an email"],
        trim:true,
        unique:true,
    },
    password:{
        type: String,
        required:[true,"add a password"],
        min:8,
        max:30,
    },
    role: {
        type: String,
        default:"user",
    },
},
{timestamps:true}
);
module.exports=mongoose.model("User",userSchema)