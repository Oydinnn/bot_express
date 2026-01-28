import userModel from "../../models/user.model.js"

export const getAllUsers = async ()=>{
  const users = await userModel.find()
  console.log(users);
  
  let str = ""
    let i = 1
    for (const user of users) {
      str +=`${i}.${user.fullname}\n`
      i += 1
    }
    return str
  
}