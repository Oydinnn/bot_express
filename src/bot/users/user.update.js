import { bot } from '../bot.js'
import { getAllUsers } from './user.service.js'
import { checkRole } from '../middleware/checkrole.middleware.js'

bot.hears("Userlarni ko'rish",  async ctx =>{
  const res = await checkRole(ctx)
  if(!res){
    return ctx.reply("⛔️ ukam senga hali bor")
  };
  
  const data = await getAllUsers(ctx)
  return ctx.reply(`✅Barcha userlar ruyxati\n${data}`)
  
})