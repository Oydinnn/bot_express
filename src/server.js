import express from "express"
import { config } from "dotenv"
config()
import { connectDb } from "./db/config.js"
import { initBot } from "./bot/bot.module.js"

const app = express()



initBot()
connectDb()
app.listen(3434, ()=> console.log('server is running...'))