import {Match} from "../models/matchModel.js";
import express from 'express';

const router = express.Router();

//Post Route to Create a new match
router.post('/', async(req,res) => {

    try {
        const {user1,user2,matchedAt,status} = req.body; // Extracting user Data
        //Create a new match instance with the provided infomration
        const newMatch = new Match({user1,user2,matchedAt,status});
        //Save the new match to the database
        await newMatch.save();
        //Respod with a success message and HTTP status 200
        res.status(200).json({message: "Match creaeted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"}); 
    }
});


//Get Route for match
router.get('/', async(req,res) => {
    try {
        const matches = await Match.find({}).sort({createdAt:-1});
        return res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({message: "Match is not found"})
    }
});

//Get Route by Id for match

router.get('/:id', async(req,res) => {
    try {
        const {id} = req.params; // Retrieve the id from the parameters
        //We need to check if that id is found in  our databas 
        const matches = await Match.findById(id);
        return res.status(200).json(matches);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Match not found"});
    }
});


//Delete Route: Delete a match by ID
router.delete(':/id', async(req,res) => {
    try {
        //We would need to get the id from the parameters
        const {id} = req.params;
        //We need to findbByIdDelete and 
        const deletedMatch = await Match.findByIdAndDelete(id);
        //Validation check to see if the id was found or not conditional
        if (!deletedMatch) {
            return res.status(404).json({message: "Match ID not found"});
        }

        //If we find it we could return a res status of 200 OK 
        res.status(200).json({message: "Match Deleted Successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

//Update Route: Update a match by ID
router.put(':/id', async(req,res) => {
    try {
        //We need to get the id of the parameter to update
        const {id} = req.params;
        //We expect attributes to update in the request body
        const updates = req.body;
        //Update the  user and return the modified document
        const updatedMatch = await Match.findByIdAndUpdate(id);
        //Handle case where the match is not found
        if (!updatedMatch) {
            return res.status(404).json({message: "Match ID not found"});
        }
        //If found we can return 200 OK response
        res.status(200).json({message: 'Match Updated Succefully', match: updatedMatch});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'});

    }
});

export default router;



