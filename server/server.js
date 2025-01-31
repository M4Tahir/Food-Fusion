import dotenv from "dotenv";

dotenv.config({path: `./.env`});


//////////////////////////////////////////////////////////////////////////////////////
//  UnCaught Exception
//////////////////////////////////////////////////////////////////////////////////////
process.on("uncaughtException", (error, origin) => {
    console.error(error);
    console.error(origin);
    process.exit(1);
});


//////////////////////////////////////////////////////////////////////////////////////
//  Database connection.
//////////////////////////////////////////////////////////////////////////////////////
import mongoose from "mongoose";

const host = process.env.DB_LOCAL;
mongoose.connect(host, {dbName: "food_fusion"})
    .then((conn) => {
        console.log("Database connection is successful");
        console.log(`Host: ${conn.connection.host}\nPort: ${conn.connection.port}\n`);
    });


//////////////////////////////////////////////////////////////////////////////////////
//  Express App
//////////////////////////////////////////////////////////////////////////////////////
import app from "./app.js";


const server = app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server has started at ${process.env.HOST} on port ${process.env.PORT}`);
});


//////////////////////////////////////////////////////////////////////////////////////
//  Unhandled Rejection: Rejection promise outside express app like when database connection
// then exception is thrown in that case we want ot to close the server and then exit program.
//////////////////////////////////////////////////////////////////////////////////////
process.on("unhandledRejection", (error, origin) => {
    console.error(error, origin);
    server.close(() => {
        process.exit(1);
    });
});