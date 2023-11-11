import { Request, Response } from "express";
import fs, { promises as fsPromises } from "fs"
import bcrypt from 'bcryptjs'
import { generateTokenHelper, getAllPDF, isExistingUser, savePdf, signUpHelper } from "../helpers/helpers";

const controllers = {
  uploadPDF: async (req: Request, res: Response) => {
    const fileName = req.file?.filename
    const email = req.body.email
    const response = await savePdf(fileName, email)
    res.json({ status: "success" })
  },

  getPDF: async (req: Request, res: Response) => {



    const pdfName = req.params.pdfName;
    const filePath = `./pdf_upload/${pdfName}`;

    const stats = await fsPromises.stat(filePath);

    res.setHeader('Content-Disposition', `inline; filename=${pdfName}`);
    res.setHeader('Content-Type', 'application/json');

    res.setHeader('File-Name', pdfName);
    res.setHeader('File-Size', stats.size.toString());
    res.setHeader('File-Last-Modified', stats.mtime.toISOString());

    const fileBuffer = await fsPromises.readFile(filePath);

    const base64Data = fileBuffer.toString('base64');

    const responseObj = {
      metadata: {
        name: pdfName,
        size: stats.size,
        lastModified: stats.mtime.toISOString(),
        type: 'application/pdf',
      },
      data: base64Data,
    };

    res.json(responseObj);
  },

  signUp: async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const isEmailExist = await isExistingUser(email)

    if (isEmailExist == null) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const response = await signUpHelper(name, email, hashedPassword)
      const jwtToken = generateTokenHelper(response._id)
      const userData = {
        status: 'success',
        message: 'Registration Successful',
        user: response,
        token: jwtToken
      }

      res.json(userData)
    } else {
      const userData = {
        status: 'failed',
        message: 'User already Exist',
        user: {},
        token: ''
      }
      res.json(userData)

    }

  },

  logIn: async (req: Request, res: Response) => {
    const { email, password } = req.body


    const isEmailExist = await isExistingUser(email)

    if (isEmailExist != null) {


      const salt = await bcrypt.genSalt(10)
      const comparePassword = await bcrypt.compare(password, isEmailExist.password)
      if (comparePassword == true) {

        const jwtToken = generateTokenHelper(isEmailExist._id)
        const userData = {
          status: 'success',
          message: 'Login Successful',
          user: isEmailExist,
          token: jwtToken
        }

        res.json(userData)
      } else {
        const userData = {
          status: 'failed',
          message: 'Password Is Incorrect',
          user: {},
          token: ''
        }

        res.json(userData)
      }



    } else {
      const userData = {
        status: 'failed',
        message: "User Doesn't Exist",
        user: {},
        token: ''
      }
      res.json(userData)

    }
  },

  allPDF: async (req: Request, res: Response) => {
    const email = req.body.email
    const response = await getAllPDF(email)
    res.json(response)

  }


};

export default controllers;
