import express from "express"
import fs from "fs"
import { upload } from "./middleware/multer"
import AppError from "./error/app_error"
import { errorHandlingMiddleware } from "./middleware/error_handling"
import router from "./routes"
import cors from 'cors'

const app=express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',router)


app.use('/*',(req,res)=>{
    throw new AppError('No router found',400)
})

app.use(errorHandlingMiddleware)


export default app