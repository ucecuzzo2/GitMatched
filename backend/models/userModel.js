import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema

const userSchema = new Schema ({

    email: {
        type: String,
        required: [true,  "Your email address is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Your password is requiured"],
        unique: true
    },
    name: {
        type: String,
        required: [true,"Your name is required"]
    },
    age: {
        type: Number,
    },
    major :{
        type: String,
    },
    location: {
        type: String
    },
    profilePicture: {
        type: String
    }
});

//The userShema and use password will be created in the above codr using mongoose and bcyrpt.js, respectiveky, for securiy purposes
userSchema.pre("save", async function() {
   if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password,12);
   }
});

//Add method to compare passwords
userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password,this.password);
};

export const User = mongoose.model('User',userSchema)