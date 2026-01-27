import { Markup } from "telegraf";
import { bot } from "../bot.js";
import { setName, setPhone } from "./start.service.js";
import userModel from "../../models/user.model.js";

bot.start(async ctx => {
  const chatId = Number(ctx.message.from.id)
  await userModel.create({ chat_id: chatId })
  ctx.reply("Assalomu aleykum!\nIsmingizni kiriting: ")
})

bot.on("text", async ctx =>{
  const name = ctx.message.text
  const chatId =  Number(ctx.message.from.id)
  const res = await setName(chatId, name)
  if(res?.fullname){
    ctx.reply(`Rahmat ${name} \nTelefon raqamingizni kiriting:`,
      Markup.keyboard([
        // Markup.button.contactRequest("📞Telefon raqam yuborish")
        [
          {
            text: "📞Telefon raqam yuborish",
            request_contact: true
          },
          {
            text: "test"
          }
        ]
      ]).resize().oneTime()
    )
  };
})
bot.on("contact", async ctx =>{
  const phone = ctx.message.contact.phone_number
  const chatId =  Number(ctx.message.from.id)

  await setPhone(chatId, phone)
  ctx.reply("Viloyatingizni tanlang: ", 
    Markup.inlineKeyboard([
      [
        Markup.button.callback("Sirdaryo", "Sirdaryo"),
        Markup.button.callback("Toshkent", "Toshkent"),
      ]
    ])
  )
})
bot.action("Toshkent", async ctx =>{
  await ctx.answerCbQuery()
  await ctx.reply("Viloyatingiz " + ctx.update.callback_query.data)
})

bot.action("Sirdaryo", async ctx =>{
  await ctx.answerCbQuery()
  await ctx.reply("Viloyatingiz " + ctx.update.callback_query.data)
})

