import userModel from "../models/userModel.js"
import TeamModel from "../models/TeameModel.js"
import {hashPassword,comparehPassword} from '../Hlpers/authHelper.js'
import JWT from "jsonwebtoken";
import dotenv from 'dotenv'
import fs from 'fs'






dotenv.config()

export const RegisterCN = async(req,res)=>{
try{
const {name,password,email} = req.body
if(!name){
    res.send({
        message:'name is required'
    })
}
if(!email){
    res.send({
        message:'email is required'
    })
}
if(!password){
    res.send({
        message:'password is required'
    })
}

//check userfound
const chickeuser = await userModel.findOne({email});
if(chickeuser){
    res.status(200).send({
        success: true,
        message:"User is already found please login"
    })
}

const hasedpassword = await hashPassword(password)
const newUser = await new userModel({
    name,email,password:hasedpassword
}).save()

res.status(200).send({
    success: true,
    message:"user registerd successfly",
    newUser
});


}catch(error){
    console.log(error);
    res.status(401).send({
        success:false,
        message:"Error in registering",
        error
    })
}
} 

export const LoginCR = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Validate email and password
      if (!email) return res.status(400).send({ message: "Email is required" });
      if (!password) return res.status(400).send({ message: "Password is required" });
  
      // Check if the user is registered
      const userregister = await userModel.findOne({ email });
      if (!userregister) return res.status(404).send({ message: "User not found, please register" });
  
      // Check if the password is correct
      const rightpassword = await comparehPassword(password, userregister.password);
      if (!rightpassword) return res.status(401).send({ message: "Incorrect password" });
  
      // Generate Token
      const userToken = JWT.sign({ id: userregister._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  
      // Successful login response
      res.status(200).send({
        success: true,
        message: "Login successful",
        userToken
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Login error",
        error: error.message,
      });
    }
  };
  export const getUser = async (req, res) => {
    try {
        console.log(  req.user);
        
      const user = await userModel.findById(req.user.id);
  
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).send({
        success: true,
        user: user, // Respond with user data
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Server error while retrieving user",
        error: error.message,
      });
    }
  };
  
  export const AddMember = async (req, res) => {
    try {
      const {name,age,cgpa,department}= req.fields;
      const {photo} = req.files;
      switch (true) {
        case !name:
          return res.status(400).send({ message: "Name is required" });
        case !age:
          return res.status(400).send({ message: "Age is required" });
        case !cgpa:
          return res.status(400).send({ message: "CGPA is required" });
        case !department:
          return res.status(400).send({ message: "Department is required" });
          case !photo:
            return res.status(500).send({ message: "Photo is Required" });
        case photo.size > 1000000:
            return res.status(500).send({ message: "Photo should be less than 1MB" });
      
      }
      



      const addMember = new TeamModel({...req.fields})
  if(photo){
    addMember.photo.data = fs.readFileSync(photo.path)
    addMember.photo.contentType = photo.type
  }
  await addMember.save()
     res.status(200).send({
        success: true,
        message :"member was added",
        addMember,// Respond with user data
      });
      }
  
     
     catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "member not added",
        error: error.message,
      });
    }
  };
  
  export const GetMember = async (req, res) => {
    try {
      const allMembers = await TeamModel.find({})
      res.status(200).send({
        success: true,
        message: "Members retrieved successfully",
        allMembers, // Respond with user data
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Failed to retrieve members",
        error: error.message,
      });
    }
  };
  