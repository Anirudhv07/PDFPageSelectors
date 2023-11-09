import { NextFunction, Request, Response } from "express";
import AppError from "../error/app_error";

export function errorHandlingMiddleware(
    err:AppError,
    req:Request,
    res:Response,
    next:NextFunction){
        return res.status(err.statusCode).send(err.message)
    }