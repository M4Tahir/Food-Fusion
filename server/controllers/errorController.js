// Error controller.
import mongoose from "mongoose";
import ExpressErrorHandler from "../utils/expressErrorHandler.js";
import jwt from "jsonwebtoken";

/**
 * As we have few types of error that we also need to mark as operation.
 * - Cast to object ID failed: This happens when using input invalid id of a document.
 * - Duplicate Value error: As when a thing tries to insert or filed, already exist then mongoose throw this duplicate key error.
 * - Validation Error: Take place when required to be filed isn't provided or invalid value is entered.
 * - jwt token expired error.
 * - invalid token error.
 * */
const handleError = (err) => {
    if (err instanceof mongoose.Error.CastError) {
        const message = `Invalid ${err.path}`;
        return new ExpressErrorHandler(message, 400);
    }
    if (err instanceof mongoose.Error.ValidationError) {
        const errors = Object.values(err.errors).map(error => error.message);
        const message = `Invalid input data: ${errors.join(". ")}`;
        return new ExpressErrorHandler(message, 400);
    }


    // Duplicate key error Database.
    if (err.code === 11000) {
        const col = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/)[0];
        const message = `Duplicate filed value: ${col}`;
        return new ExpressErrorHandler(message, 400);
    }

    if (err instanceof jwt.TokenExpiredError)
        return new ExpressErrorHandler(`${err.message}, please login again`, 401);

    if (err instanceof jwt.JsonWebTokenError)
        return new ExpressErrorHandler(`invalid token, please login again`, 401);

    return err;
};


const sendErrorProduction = (err, res) => {
    console.log(err);
    if (!err.isOperational) {
        console.error(err);
        return res.status(500).json({
            status: "error",
            message: "Something went wrong"
        });
    }
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};

const sendErrorDevelopment = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    });
};

const globalExpressErrorController = (err, req, res, next) => {
    err.status ||= "fail";
    err.statusCode ||= 500;
    if (Number.isInteger(err.statusCode) || err.statusCode < 100 || err.statusCode > 599)
        err.statusCode = 500;

    if (process.env.NODE_ENV === "development")
        sendErrorDevelopment(err, res);

    if (process.env.NODE_ENV === "production") {
        let error = err;
        error = handleError(err);
        sendErrorProduction(error, res);
    }
};

export default globalExpressErrorController;