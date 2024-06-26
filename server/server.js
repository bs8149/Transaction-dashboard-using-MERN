import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'

dotenv.config()
connectDB();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', productRouter)

app.listen(port, () => console.log(`Server started at port: ${port}`))