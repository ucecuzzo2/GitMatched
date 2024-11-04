import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {mongoDBURL} from './secret.js';
import { PORT } from './config.js';
import dotenv from 'dotenv';
dotenv.config();
//Import our Routes-----------------
import userRoute from './routes/userRoute.js';
import matchRoute from './routes/matchRoute.js';
import eventRoute from './routes/eventRoute.js';






//----------------------------------
const app = express();

//Enable cors for all origins (or specify orgigin)
//By default, bwowers enforce the same-origin plocy, whihc restricts web pages form making requests to a different origin.
//Which mean if your front-end running on host 3000 tries to access resruces from a back-end sefrver on 5555, the browser
//Will block this request unless CORS is enabled.
app.use(cors()); // Allow all origins
//Or to restrict acces to a speciifc orgigin
//app.use(cors({origin: 'http://localhost:3000'}));

//Middleware to parse JSON bodies
app.use(express.json());


app.get('/', (request,response) => {
    console.log(request)
    return response.status(200).send("Welcome to the application");
});

//Middleware
app.use('/users',userRoute);
app.use('/match',matchRoute);
app.use('/event',eventRoute);


mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`APP is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});










