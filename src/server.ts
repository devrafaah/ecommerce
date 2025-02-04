import express from "express";
import { routes } from "./routers/index.js";
import { initializeApp } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware.js";
import { auth } from "./middlewares/auth.middleware.js";
import { v2 as cloudinary } from 'cloudinary';


initializeApp();
initializeFirebaseApp({
    apiKey : process.env.FIRE_API_KEY
});
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_APIKEY,
    api_secret : process.env.CLOUD_API_SECRET
});
const app = express();
auth(app);
routes(app);
pageNotFoundHandler(app);
errorHandler(app);


app.listen(3000, () => {
    console.log("SERVIDOR NA PORTA 3000");
});
