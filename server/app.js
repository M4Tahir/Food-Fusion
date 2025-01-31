import express from "express";
import morgan from "morgan";

import globalExpressErrorController from "./controllers/errorController.js";
import recipesRouter from "./routers/recipeRouter.js";

// 1) Global Body parse middleware.
const app = express();
app.use(express.json());

// 2) Global request logger middleware.
if (process.env.NODE_ENV === "development")
    app.use(morgan("dev"));

app.use("/api/v1/recipes", recipesRouter);

// LAST) Global error handler middleware.
app.use(globalExpressErrorController);


app.all("*", (req, res, next) => {
    res.status(400).json({
        status: "error",
        message: "The requested URL was not found on this server. That’s all we know."
    });
});

export default app;