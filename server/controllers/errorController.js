// Error controller.

const sendErrorProduction = (err, res) => {
    if (!err.isOperational) {
        console.log(err);
        res.status(500).json({
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

    if (process.env.NODE_ENV === "production")
        sendErrorProduction(err, res);
};

export default globalExpressErrorController;