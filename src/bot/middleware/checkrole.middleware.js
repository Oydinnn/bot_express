import userModel from "../../models/user.model.js"

export const checkRole = async(ctx) => {
  const user = await userModel.findOne({chat_id: ctx.message.from.id})
  if(user.role == 'SUPERADMIN'){
    return true
  }
  return false
  
}