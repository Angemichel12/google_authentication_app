import { Request, Response } from "express";
import { UserModel } from "../db/models/user";
import cloudinary from "../helper/cloudinary";

// all about users from database starts here!

// function to get all users from database

const getAllUsersFromDataBase = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    if (!users) 
        return res.status(404).json({ message: "No user found", status: "Not Found"});

    return res.status(200).json({ message: "List of all users", data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", Error: error });
  }
};

// function to get single user from database

const getSingleUserFromDataBase = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) 
        return res.status(404).json({ message: "ID is required", status: "Not Found"});

    const singleUser = await UserModel.findOne({ where: { id } });
    if (!singleUser)
      return res.status(404).json({ message: "The ID is not found", status: "Not Found"});

    res.status(200).json({ message: "A user found", data: singleUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// a function to update user data from database

const updateUserFromDataBase = async(req: Request, res: Response)=>{
    try {
      let results: any;
        const { id } = req.params;
        
        const user = await UserModel.findOne({ where: { id } });
        
        if (!user) {
          console.log("User not found");
          return res.status(404).json({ message: "No user found!", status: "Not Found" });
        }
        
        const { firstName, lastName, profile } = user.dataValues;
        if(req.file){
           results = await cloudinary.uploader.upload(req.file.path);   
        }
        
        
        const userDataToUpdate = {
            firstName: req.body.firstName || firstName,
            lastName: req.body.lastName || lastName,
            profile: results.secure_url
        };
        
        const updatedUser = await user.update(userDataToUpdate);

        return res.status(200).json({ message: "User updated", data: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
}


export default {
  getAllUsersFromDataBase,
  getSingleUserFromDataBase,
  updateUserFromDataBase,
};
