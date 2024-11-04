import mongoose from "mongoose";
const Schema = mongoose.Schema


const eventSchema = new Schema ({

    createrId: {
        type: Schema.Types.ObjectId,
        required: false, //Will need to change to true soon
        ref: 'User'
    },
    title: {
        type: String,
        def: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
    },
    eventDate: {
        type: Date, // Date and Time of the Event
    },
    participants: [{ //Array for UserID affiliated with an Event 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false // We would need to change this to true 
    }],
},{ 
    timestamps: true //Automatically manages CreatedAt and UpdatedAt fields
    
});


export const Event = mongoose.model('Event',eventSchema);