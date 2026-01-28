import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  chat_id:{
    type:Number,
    unique:true
  },
  fullname:{
    type:String,
  },
  contact:{
    type:String,
  },
  role:{
    type:String,
    enum:['SUPERADMIN', 'ADMIN', 'USER'],
    default: "USER"
  },
  step:{
    type:String,
    enum: ['req_subscription', 'req_name', 'req_contact','req_region', 'req_menu'],
    default: "check-subscription"
  }
})

export default mongoose.model("users", userSchema)