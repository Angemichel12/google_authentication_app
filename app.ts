import express from 'express'
import { Request, Response } from 'express';
const app = express();
app.use(express.json());
app.use("/",(req:Request,res:Response) => {
    return res.status(200).json({
        status: 200,
        message: "Welcome to our user apis"
    })
})

export default app