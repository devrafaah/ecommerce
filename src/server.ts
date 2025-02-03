import express from "express";
import { routes } from "./routers";

const app = express();

routes(app);

app.listen(3000, () => {
    console.log("SERVIDOR NA PORTA 3000");
});
