import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({path: `./.env`});


const server = app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server has started at ${process.env.HOST} on port ${process.env.PORT}`);
});

