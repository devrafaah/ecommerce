import express from "express";
import { routes } from "./routers";
import { initializeApp } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware";
import { auth } from "./middlewares/auth.middleware";


initializeApp();
initializeFirebaseApp({
    apiKey : process.env.API_KEY
});
const app = express();
auth(app);
routes(app);
pageNotFoundHandler(app);
errorHandler(app);


app.listen(3000, () => {
    console.log("SERVIDOR NA PORTA 3000");
});
