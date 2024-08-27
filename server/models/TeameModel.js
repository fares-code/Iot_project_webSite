import mongoose from "mongoose";

const teameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cgpa: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 150
  },
  department: {
    type: String,
    required: true
  },
  photo: {
    data: {
      type: Buffer,
      required: true
    },
    contentType: {
      type: String,
      required: true
    }
  }
});

export default mongoose.model("teame", teameSchema);
