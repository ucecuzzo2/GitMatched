import {Event} from "../models/eventModel.js";
import express from 'express';

const router = express.Router();

//Post Route for Event
router.post('/', async(req,res) => {
    try {
        //We would need to get the body of the reqest
        const {createrId,title,date,location,eventDate,participants} = req.body;
        //We would need to create a new instance with the provided information
        const newEvent = new Event({createrId,title,date,location,eventDate,participants});
        //Save the new event to the database
        await newEvent.save();
        //Respond with a success mesage and HTTP status 200 for new event
        res.status(200).json({message: "Event Created Successfulty"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

//Get Route for event
router.get('/', async(req,res) => {
    try {
        //We could use a find method to find all the Events
        const event = await Event.find({}).sort({createdAt: -1});
        //We could then return the res 200 Ok
        res.status(200).json(event);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Sever Error"});
    }
});

//Get Route by ID for event
router.get('/:id', async(req,res) => {
    try {
        //What need to get the id from the parameters
        const {id} = req.params;
        //we need to find by id and for the  event
        const events = await Event.findById(id);
        //We could then return 200 ok when we find it
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

//Delete Route By ID for event
router.delete('/:id', async (req,res) => {

    try {
        //We need to find parameters of if
        const {id} = req.params;
        //We need to findbyidand delete 
        const deletedEvent = await Event.findByIdAndDelete(id);
        //We need to check if the id was found
        if (!deletedEvent) {
            return res.status(404).json({message: "Event ID not found"});
        }
        //If we find it we can return 200 ok
        res.status(200).json({message: "Event Deleted Successfuly"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}); 


//Update Route (Put) by id for event
router.put('/:id', async(req,res) => {
    try {
        //We need to get the id
        const {id} = req.params;
        //We expect attributes to update in the request body
        const updates = req.body;
        //We could findByIdAndUpdate
        const updateEevnt = await Event.findByIdAndUpdate(id,updates, {
            new: true, // Return the updated Document
            runValidators: true // Enforce Schema validations on updates
        });
        //Handle case where the Event is not found
        if (!updateEevnt) {
            return res.status(404).json({message: "Event ID not found"});
        } 
        //Return 200 ok 
        res.status(200).json({message: "Event Updated Successully"});
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Sever Error"});
    }
});





export default router;

