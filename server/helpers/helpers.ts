import { configKeys } from "../config/configKey";
import User from "../model/schema";
import jwt, { JwtPayload } from 'jsonwebtoken'
import fs from "fs"


export const signUpHelper = async (name: string, email: string, password: string) => {
    const user = {
        name,
        email,
        password
    }
    const newUser = new User(user)

    return await newUser.save()

}

export const savePdf = async (fileName?: string, email?: string) => {
    const file = fs.createReadStream(`./pdf_upload/${fileName}`)
    const response = await User.updateOne({ email }, { $addToSet: { uploads: fileName } })
    if (response) {
        return true
    }

}

export const passwordChecker = async (email: string, hashedPassword: string) => {

    const findEmail = await User.findOne({ email })

    if (findEmail?.password == hashedPassword) {


        return findEmail
    } else {
        return false
    }


}

export const isExistingUser = async (email: string) => {
    const response = await User.findOne({ email: email })
    return response

}

export const generateTokenHelper = (id: object) => {

    const token = jwt.sign({ id }, configKeys.JWT_SECRET_KEY, {
        expiresIn: '2d'
    })

    return token

}

export const getAllPDF = async (email: string) => {
    const response = await User.findOne({ email })
    const allPDF = response?.uploads
    return allPDF
}