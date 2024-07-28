const jwt=require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelpers");
const userModel = require("../models/userModel");
var { expressjwt } = require("express-jwt");


const requireSignIn = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth' // Ensure the decoded token is set to req.auth
  });
  
  requireSignIn.unless = require("express-unless");

const registerController= async (req,res)=> {
    try {
        const {name,email,password}=req.body;
        if(!name){
            return res.status(400).send({
                success:false,
                message:"name required"
            })
        }
        if(!email){
            return res.status(400).send({
                success:false,
                message:"email required"
            })
        }
        if(!password || password.length<6){
            return res.status(400).send({
                success:false,
                message:"password should be 6 character long"
            })
        }

        const theUser=await userModel.findOne({email:email})
        if(theUser){
            return res.status(500).send({
                success:false,
                message:"user already exist"
            })
        }

        const hashedPassword=await hashPassword(password);

        const savedUser=await userModel({name,email,password:hashedPassword}).save();

        return res.status(201).send({
            success:true,
            message:"user created"})

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"internal server error",
            error,
        })
    }
};

const loginController= async (req,res)=> {
    try {
        const {email,password}=req.body;
        if(!email){
            return res.status(400).send({
                success:false,
                message:"email required"
            })
        }
        const user=await userModel.findOne({email:email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }

        const isMatch=await comparePassword(password,user.password);
        if(!isMatch){
            return res.status(400).send({
                success:false,
                message:"invalid password"
            })
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

        user.password=undefined;

        res.status(200).send({
            success:true,
            message:"login success",
            token,
            user,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"something wrong in login api",
            error,
        })
        
    }
}
const updateUserController=async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user=await userModel.findOne({email});
        if(password && password.length<6){
            return res.status(400).send({
                success:false,
                message:"password should be 6 character long"
            })
        }
        const hashedPassword=password? await hashPassword(password):undefined;
        const newUser=await userModel.findOneAndUpdate({email},{name,email,password:hashedPassword||password},{new:true});
        newUser.password=undefined;
        res.status(200).send({
            success:true,
            message:"user updated",
            user:newUser,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update user",
            error,
        })
    }
}


module.exports={requireSignIn ,registerController,loginController,updateUserController};