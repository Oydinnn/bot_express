import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  chat_id:{
    type:Number,
    unique:true
  },
  fullname:{
    type:String,
    // required:true
  },
  contact:{
    type:String,
    // required:true
  },
})

export default mongoose.model("users", userSchema)