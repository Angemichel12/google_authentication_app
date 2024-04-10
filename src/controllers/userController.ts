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
        const { id } = req.params;
        // console.log("ID:", id);
        
        const user = await UserModel.findOne({ where: { id } });
        // console.log("User:", user);
        
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "No user found!", status: "Not Found" });
        }

        const { firstName, lastName, profile } = user.dataValues;
        let updatedProfile = profile;
        if(req.file){
            const results = await cloudinary.uploader.upload(req.file.path);
            await user.update({profile: results.secure_url});
            updatedProfile = results.secure_url
            // console.log("profile updated", updatedProfile);
            
        }

        console.log("Old data:", { firstName, lastName, profile });
        
        const userDataToUpdate = {
            firstName: req.body.firstName || firstName,
            lastName: req.body.lastName || lastName,
            profile: updatedProfile
        };
        
        const updatedUser = await user.update(userDataToUpdate);
        // console.log("Updated data:", userDataToUpdate);

        return res.status(200).json({ message: "User updated", data: updatedUser });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
}


export default {
  getAllUsersFromDataBase,
  getSingleUserFromDataBase,
  updateUserFromDataBase,
};
