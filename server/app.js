import express from "express";
import morgan from "morgan";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalExpressErrorController from "./controllers/errorController.js";
import recipesRouter from "./routers/recipeRouter.js";
import userRouter from "./routers/userRouter.js";
import { getArrayFields } from "./utils/mongooseUtils.js";
import RecipeModel from "./models/recipeModel.js";

const arrayFields = getArrayFields({ RecipeModel });

const app = express();

// 1) Prevent parent pollution, this needs to be place before the body is parsed so that hpp can sanitize the req.query.
// ?sort=servings&sort=servings: if we don't use, then we get an array as input instead of string and try to split an array by ","
app.use(
	hpp({
		checkQuery: true,
		checkBody: true,
		whitelist: arrayFields,
	}),
);

// 2) Global Body parse middleware.
app.use(express.json());

// use parse data encoded in url to body. When the form data sent request this, then form data is encoded in the url.
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: "*",
		credentials: true,
	}),
);

app.use(cookieParser());

// 3) Global request logger middleware.
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/v1/recipes", recipesRouter);
app.use("/api/v1/users", userRouter);

// LAST) Global error handler middleware.
app.use(globalExpressErrorController);

app.all("*", (req, res, next) => {
	res.status(400).json({
		status: "error",
		message: "The requested URL was not found on this server. That's all we know",
	});
});

export default app;
