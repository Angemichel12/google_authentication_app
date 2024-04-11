import { Request, Response } from "express";
import { UserModel } from "../db/models/user";
import cloudinary from "../helper/cloudinary";
import nodemailer from "nodemailer"; //import nodemailer module

//create nodemailer transporter

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// all about users from database starts here!

// function to get all users from database

const getAllUsersFromDataBase = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    if (!users)
      return res
        .status(404)
        .json({ message: "No user found", status: "Not Found" });

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
      return res
        .status(404)
        .json({ message: "ID is required", status: "Not Found" });

    const singleUser = await UserModel.findOne({ where: { id } });
    if (!singleUser)
      return res
        .status(404)
        .json({ message: "The ID is not found", status: "Not Found" });

    res.status(200).json({ message: "A user found", data: singleUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// a function to update user data from database

const updateUserFromDataBase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // console.log("ID:", id);

    const user = await UserModel.findOne({ where: { id } });
    // console.log("User:", user);

    if (!user) {
      console.log("User not found");
      return res
        .status(404)
        .json({ message: "No user found!", status: "Not Found" });
    }

    // get user's email form darabase
    const userEmail = user.dataValues.email;

    const { firstName, lastName, profile } = user.dataValues;
    let updatedProfile = profile;
    if (req.file) {
      const results = await cloudinary.uploader.upload(req.file.path);
      await user.update({ profile: results.secure_url });
      updatedProfile = results.secure_url;
      // console.log("profile updated", updatedProfile);
    }

    console.log("Old data:", { firstName, lastName, profile });

    const userDataToUpdate = {
      firstName: req.body.firstName || firstName,
      lastName: req.body.lastName || lastName,
      profile: updatedProfile,
    };

    const updatedUser = await user.update(userDataToUpdate);
    // console.log("Updated data:", userDataToUpdate);

    //composing the email
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail, // receiver of email
      subject: "Profile Updated",
      html: `
        <p>Hello ${userDataToUpdate.firstName}, your profile has been updated successfully!.</p>
        <p>Here are your profile details:</p>
        <ul>
          <li>First Name: ${userDataToUpdate.firstName}</li>
          <li>Last Name: ${userDataToUpdate.lastName}</li>
        </ul>
        <p>Profile:</p>
        <img src="${userDataToUpdate.profile}" alt="profile image" style="width: 150px; height: 200px; border-radius: 10px;"/>
      `
    };
    

    //send email

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return res.status(200).json({ message: "User updated", data: updatedUser });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

export default {
  getAllUsersFromDataBase,
  getSingleUserFromDataBase,
  updateUserFromDataBase,
};
