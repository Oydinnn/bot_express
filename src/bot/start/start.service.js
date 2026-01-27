import userModel from "../../models/user.model.js";

export const setName = async (chatId, fullname) => {
  const user = await userModel.findOneAndUpdate(
    { chat_id: chatId },   // chat_id orqali qidirish
    { fullname },          // yangilash
    { new: true, upsert: true } // topilmasa yangi user yaratadi
  )
  return user;
}

// telefon raqam qo‘yish
export const setPhone = async (chatId, phone) => {
  const user = await userModel.findOneAndUpdate(
    { chat_id: chatId },
    { contact: phone },
    { new: true }
  )
  return user;
}
