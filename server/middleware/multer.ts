import multer from 'multer'
import path from 'path'
import AppError from '../error/app_error'
import { Request, Response } from 'express'


//TO UPLOAD PDF TO SERVER
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'pdf_upload')
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname)
        const filename = file.originalname.split(ext)[0]
        cb(null,filename+'_'+Date.now()+ext)
        
        
    }
})

//CHECK WHETHER THE INCOMMING FILE IS PDF OR NOT
const fileFilter=(req:Request,file:any,cb:any)=>{
    if(file.mimetype==='application/pdf') cb(null,true)
    else cb(new AppError('upload pdf', 400))

}


export const upload=multer({storage,fileFilter})