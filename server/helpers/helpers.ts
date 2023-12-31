import { configKeys } from "../config/configKey";
import User from "../model/schema";
import jwt, { JwtPayload } from 'jsonwebtoken'
import fs from "fs"


//SIGN UP
export const signUpHelper = async (name: string, email: string, password: string) => {
    const user = {
        name,
        email,
        password
    }
    const newUser = new User(user)

    return await newUser.save()

}


//TO SAVE PDF TO SERVER AND DB
export const savePdf = async (fileName?: string, email?: string) => {
    const file = fs.createReadStream(`./pdf_upload/${fileName}`)
    const response = await User.updateOne({ email }, { $addToSet: { uploads: fileName } })
    if (response) {        
        return true
    }

}

//TO CHECK USER ALREADY EXISTED OR NOT
export const isExistingUser = async (email: string) => {
    const response = await User.findOne({ email: email })
    return response

}


//TO GENERATE JWT TOKEN
export const generateTokenHelper = (id: object) => {

    const token = jwt.sign({ id }, configKeys.JWT_SECRET_KEY, {
        expiresIn: '2d'
    })

    return token

}

//VERIFY JWT TOKEN
export const verifyToken=(token:string)=>{
    if(configKeys.JWT_SECRET_KEY){
        const verification=jwt.verify(token,configKeys.JWT_SECRET_KEY) as JwtPayload
        if(verification.exp!=undefined){
            const currentTimeInSecond=Math.floor(Date.now()/1000)
            if(verification.exp>=currentTimeInSecond){
                return true
            }else{
                return false
            }
        }else{
            return undefined
        }
        
    }
}


//TO GET ALL PDF UPLOADED BY A USER
export const getAllPDF = async (email: string) => {
    const response = await User.findOne({ email })
    const allPDF = response?.uploads
    return allPDF
}


//TO DELETE A PDF
export const PDFDelete=async(pdfName:string,email:string)=>{
    const response = await User.findOneAndUpdate(
        { email },
        { $pull: { uploads: pdfName } },
        { new: true }
    );
    await fs.rm(`./pdf_upload/${pdfName}`,(err)=>{
        if(err) console.log("fs.rm :",err);
        
    })
    return response
}