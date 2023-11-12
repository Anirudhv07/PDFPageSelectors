import { Application } from "express";
import express from 'express'
import { upload } from "../middleware/multer";

import controllers from "../controller/controller";


    const router=express.Router()

    router.post('/api/post',upload.single('pdf'),controllers.uploadPDF)

    router.get('/api/pdf/:pdfName',controllers.getPDF)

    router.post('/api/signup',controllers.signUp)

    router.post('/api/login',controllers.logIn)

    router.post('/api/get-all-pdf',controllers.allPDF)

    router.put('/api/deletePDF',controllers.deletePDF)



export default router