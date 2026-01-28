import { Markup } from "telegraf";
import { bot } from "../bot.js";
import { setName, setPhone } from "./start.service.js";
import userModel from "../../models/user.model.js";
import { checkSubscription } from "../subscription/subscription.js";
import { keyboardUser } from "../keyboards/keyboard.user.js";
import { subscriptionKeyboard } from "../keyboards/subscription.keyboard.js";
import { selectRegionKeyboard } from "../keyboards/selectRegion.keyboard.js"
import { superadminKeyboard } from "../keyboards/admin.keyboard.js";

bot.start(async ctx => {
  const chatId = Number(ctx.message.from.id)
  const existUser = await userModel.findOne({chat_id: chatId})
  if(existUser.step == "req_contact"){
    return ctx.reply(
      `Rahmat ${existUser.fullname}\n Telefon raqamingizni kiriting!`,
      Markup.keyboard(keyboardUser).resize().oneTime()
    )
  }

  if(existUser && existUser.role == 'SUPERADMIN'){
    return ctx.reply("Admin janoblari menyudan tanlang",
      superadminKeyboard
    )
  }

  const isSubscription = await checkSubscription(ctx)
  if(!isSubscription){
    return ctx.reply("botdan to'liq foydalanish uchun kanalga a'zo bo'ling!",
      subscriptionKeyboard
    )
  };

  if(!existUser){
    await userModel.create({ chat_id: chatId })
  }
  await userModel.updateOne({chat_id:chatId}, {step: "req_name"})
  // await userModel.updateOne({chat_id: chatId}, {role: 'SUPERADMIN'})
  ctx.reply("Assalomu aleykum!\nIsmingizni kiriting: ")
})



bot.on("text", async ctx =>{  
  const name = ctx.message.text
  const chatId =  Number(ctx.message.from.id)
  const user = await userModel.findOne({chat_id:chatId})
  if(user && user.step == 'req.name'){
    const res = await setName(chatId, name)
  }
  const res = await setName(chatId, name)

  if(res?.fullname){
    await userModel.updateOne({chat_id:chatId}, {step: "req_contact"})

    ctx.reply(`Rahmat ${name} \nTelefon raqamingizni kiriting:`,
      Markup.keyboard(keyboardUser).resize().oneTime()
    )
  };
})
bot.on("contact", async ctx =>{
  const phone = ctx.message.contact.phone_number
  const chatId =  Number(ctx.message.from.id)
  const user = await userModel.findOne({chat_id: chatId})

  if(user && user.step == "req.contact"){
    await setPhone(chatId, phone)
    await userModel.updateOne({chat_id:chatId}, {step: "req_region"})
    ctx.reply("Viloyatingizni tanlang: ", selectRegionKeyboard)
  }
})
bot.action("Toshkent", async ctx =>{
  await ctx.answerCbQuery()
  await ctx.reply("Viloyatingiz " + ctx.update.callback_query.data)
})

bot.action("Sirdaryo", async ctx =>{
  await ctx.answerCbQuery()
  await ctx.reply("Viloyatingiz " + ctx.update.callback_query.data)
})

bot.action("check-sub", async ctx =>{
  const isSub = await checkSubscription(ctx)
  if(!isSub){
    return ctx.reply("iltimos, kanallarga a'zo bo'ling!",
      subscriptionKeyboard
    )
  }
  return ctx.reply("Rahmat! Botdan foydalanishingiz mumkin!")
})

