import {User} from "../models/userModel.js";
import express from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from "../secret.js"; // Scret key for JWT
import bcrypt from 'bcrypt'; // Add this line at the top with your other imports


const router = express.Router();

//Sign up Route
router.post('/signup', async(req,res) => {
    try {
        const {email,password,name} = req.body;
        const existingUser = await User.findOne({email});

        //Check if the user already exists
        if (existingUser) {
            return res.status(404).json({message: "Email already registered"});
        }

        //Create a new user and save to database
        const newUser = new User({email,password,name});
        await newUser.save();

        console.log("JWT Secret: ", jwtSecret);
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT secret is not defined" });
        }

        //Generate JWT Token 
        const token = jwt.sign({userId: newUser._id}, process.env.jwtSecret, {expiresIn: '1h'});

        res.status(200).json({message: 'User Created Successfully', token});
    } catch (error) {
        console.log(error);
        res.status(500).json({messgae: "Internal Server Error"});
    }
});

//Login Route 
router.post('/login', async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        //Compare the passweord
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        //Generate JWT
        const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: '1h'});
        res.status(200).json({message: "Loggned in successfully", token});
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}); 



//Get Route Get a new user
router.get('/',async(req,res) => {
    try {
        //Store our users in variable and use a find function to find all of our users
        const users = await User.find({}).sort({createdAt:-1})
        //If we find it we can return a status of 200 and the json of all the users
        res.status(200).json(users);
    } catch(erorr) {
        res.status(500).json({error: 'User Not Found'})
    }
});

//Get Route: getting a single user by an ID
router.get('/:id', async(req,res) => {
    try {
        const{id} = req.params
        const users = await User.findById(id)
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({error: 'User Id Not Found'})
    }
});


//Delete Route: Delete a user by ID
router.delete('/:id', async(req,res) => {
    try {
        //Grab the id from the parameters
        const {id} = req.params;
        //Find the the id by userand delete is by passing in the id from our parameters
        const deletedUser = await User.findByIdAndDelete(id);
        //Check if user was found and deleted
        if (!deletedUser) {
            return res.status(404).json({message: "User Not Found"});
        }

        //If found we could return a success
        res.status(200).json({message: "User Deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
});


//Put Route (Update): Update a users attribute by ID
router.put ('/:id', async(req,res) => {
    try {
        //Grabs the id of the object from the parameters
        const {id} = req.params;
        const updates = req.body; // Expecting attributes to update in the request body

        //Update the user and return the modified document
        const updatedUser = await User.findByIdAndUpdate(id,updates,{new: true});

        //Handle case where user is not found
        if (!updatedUser) {
            return res.status(404).json({message: 'User not found'});
        }

        //Respond with the updates user Data
        res.status(200).json({message: 'User updated successfullt', user: updatedUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
});





export default router;



