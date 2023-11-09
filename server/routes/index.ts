import { Application } from "express";
import express from 'express'
import { upload } from "../middleware/multer";

import controllers from "../controller/controller";


    const router=express.Router()

    router.post('/api/post',upload.single('pdf'),controllers.uploadPDF)




export default router