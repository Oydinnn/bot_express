import { Markup } from "telegraf";
export const selectRegionKeyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback("Sirdaryo", "Sirdaryo"),
        Markup.button.callback("Toshkent", "Toshkent"),
      ]
    ])