import mongoose from "mongoose";

const MqttSchema = new mongoose.Schema({
    Temperature_Target:{
        type:Number
    },
    Door_Status_Target:{
        type:Boolean} 
});

export default mongoose.model("Matt_Data", MqttSchema);
