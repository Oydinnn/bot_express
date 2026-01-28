import { Markup } from "telegraf";

export const superadminKeyboard = Markup.keyboard([
  [
    {
      text:"Admin qo'shish"
    },
    {
      text:"Userlarni ko'rish"
    }
  ],
  [
    {
      text:"Adminni o'chirish"
    },
    {
      text:"Sozlamalar"
    }
  ]
])