import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    email:{
type:String,
required:true,
unique: [true, "Email is Alredy registerd"],  // Ensure email is unique
    }
    
    ,
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
})

export default mongoose.model("iotProjectUser",UserSchema);