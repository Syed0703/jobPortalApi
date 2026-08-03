import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../config/datauri.js";
import cloudinary from "../config/cloudinary.js";


// Register user function
const regster = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        if(!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        // Cloudinary
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Email verification
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                message: "User already exist with this email.",
                success: false
            })
        }

        // Password Hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating User
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        })
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}


// Login function
const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        // Email verification
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }


        // Password verification
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        //Check role is correct or not
        if(role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role. ",
                success: false
            })
        }

        //Generate jwt Token
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'});

        user = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // Store jwtToken in cookie
        return res.status(200).cookie("token", token, {
            maxAge: 1*24*60*60*1000, 
            httpOnly: true, 
            sameSite: 'strict'
        }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


// Logout function
const logout = async (req, res) => {
    try {
        // Removing jwtToken from cookie
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}



// Update Profile function
const updateProfile = async (req, res) => {
    try {
        const {fullName, email, phoneNumber, bio, skills} = req.body;

        const file = req.file;
        // Cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


        // Convert string to array
        let skillsArray;
        if(skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;  // Middleware authentication

        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        // Update data
        if(fullName) user.fullName = fullName
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillArray

        // Resume 
        if(cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; // Save cloudinary url
            user.profile.resumeOriginalName = file.originalname; // Save the original file name
        }

        await user.save();

        user = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            sucess: true
        })
    } catch (error) {
        console.log(error);
        
    }
}


export {regster, login, logout, updateProfile};