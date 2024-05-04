import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import "./utils/db.js"
import Member from "./model/member.js"

const app = express()
const port = 3000

dotenv.config()

// mongoose.connect(process.env.DATABASE, {

// }).then((res) => console.log('Database Connection Success.')).catch((err) => {
//     console.log(err)
//     process.exit(1)
// })

app.use(cors())

app.get('/', async (req, res) => {
    const dataMember = await Member.find()
    res.status(200).json({
        message: "Message from Express Endpoint.",
        dataMember
    })
})

app.listen(port, () => {
    console.log(`Connected in port ${port} \nhttp://localhost:${port}`);
})