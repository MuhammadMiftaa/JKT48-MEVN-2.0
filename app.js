import express from "express"
import fs from 'fs';
import dotenv from "dotenv"
import cors from "cors"
import "./utils/db.js"
import Member from "./model/member.js"
import authRouter from "./router/authRouter.js"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express()
const port = 3000

dotenv.config()

const packageJson = JSON.parse(fs.readFileSync('node_modules/express/package.json', 'utf8'));
const expressVersion = packageJson.version;

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
process.env.NODE_ENV == "development" ? app.use(morgan('dev')) : ''

app.get('/api/v1/test', async (req, res) => {
    const dataMember = await Member.find()
    res.status(200).json({
        message: "Message from Express Endpoint.",
        dataMember
    })
})

app.use('/api/v1/auth', authRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`\n  EXPRESS JS v${expressVersion} ready in 100ms \n\n  Local:    http://localhost:${port} `);
})