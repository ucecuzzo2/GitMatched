import mongoose from "mongoose";
const Schema = mongoose.Schema

const matchSchema = new Schema ({

    user1: {
        type: Schema.Types.ObjectId, // Reference to the first user for the match
        required: false,
        ref: 'User' // Refernce to the User model
    },
    user2: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'User' // Refrcnes to the User model
    },
    matchedAt: {
        type: Date,
        default: Date.now // Automaticaly set the timestamp when the match is created
    },
    status: {
        type: String,
        enum: ['active','inactice'], // Possible values for the match status
        default: 'active' //Default status when a match is created
    }
}, {
    timestamps: true // Automatically manage createdAT and updatedAt fields
    
});


export const Match = mongoose.model('Match',matchSchema)