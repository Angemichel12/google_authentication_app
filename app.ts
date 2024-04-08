import express from 'express'
import { Request, Response } from 'express';
import dotenv from 'dotenv'

const app = express();
dotenv.config()

app.use(express.json());

app.use("/",(req:Request,res:Response) => {
    return res.status(200).json({
        status: 200,
        message: "Welcome to our user apis"
    })
})

export default app