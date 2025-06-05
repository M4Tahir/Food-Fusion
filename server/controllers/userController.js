import * as factory from "./handlerFactory.js";
import UserModel from "../models/userModel.js";
import { handleAsyncError } from "../utils/handleAsyncError.js";
import ExpressErrorHandler from "../utils/expressErrorHandler.js";

const filterObj = (body, ...allowedFields) => {
	return Object.fromEntries(Object.entries(body).filter(([key]) => allowedFields.includes(key)));
};

const getMe = (req, res, next) => {
	req.params.id = req.user.id; // as user needs to be logged, so we must have user added to the request object.
	next();
};

const updateMe = handleAsyncError(async (req, res, next) => {
	const fields = filterObj(req.body, "first_name", "last_name", "email");
	if (!Object.keys(fields).length)
		return next(new ExpressErrorHandler("No valid fields provided for update. Please include at least one of: first_name, last_name, or email"));
	const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, fields, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		status: "success",
		data: updatedUser,
	});
});

const deleteMe = handleAsyncError(async (req, res, next) => {
	await UserModel.findByIdAndUpdate(req.user.id, { active: false });
	res.status(204).json({
		status: "success",
		data: null,
	});
});

// Admin-only route.

const getAllUsers = factory.getAll(UserModel);

const createUser = function (req, res) {
	res.status(500).json({
		status: "Internal server error",
		message: "route is not yet defined, please use signup.",
	});
};

const getUser = factory.getOne(UserModel);

const updateUser = factory.updateOne(UserModel);

const deleteUser = factory.deleteOne(UserModel);

export { getAllUsers, createUser, getUser, updateUser, deleteUser, getMe, updateMe, deleteMe };
