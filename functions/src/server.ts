import express from "express";
import { routes } from "./routers/index.js";
import { initializeApp } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware.js";
import { auth } from "./middlewares/auth.middleware.js";
import { v2 as cloudinary } from 'cloudinary';
import { onRequest } from "firebase-functions/https";




initializeFirebaseApp({
    apiKey: process.env.API_KEY,
});
initializeApp();
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


export const api = onRequest(app);