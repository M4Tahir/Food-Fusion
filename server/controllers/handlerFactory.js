import { handleAsyncError } from "../utils/handleAsyncError.js";
import ApiFeatures from "../utils/apiFeatures.js";

/**
 * @function createOne
 * @description Creates a new document in the database.
 * @param {Model} Model - The Mongoose model to use for creation.
 * @returns {Function} - Express route handler.
 */
const createOne = (Model) => {
	return handleAsyncError(async function (req, res, next) {
		const data = await Model.create(req.body);
		res.status(200).json({
			status: "success",
			data,
		});
	});
};

/**
 * @function updateOne
 * @description Updates an existing document by ID.
 * @param {Model} Model - The Mongoose model to update.
 * @returns {Function} - Express route handler.
 */
const updateOne = (Model) => {
	return handleAsyncError(async (req, res, next) => {
		const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data,
		});
	});
};

/**
 * @function deleteOne
 * @description Deletes a document by ID.
 * @param {Model} Model - The Mongoose model to delete from.
 * @returns {Function} - Express route handler.
 */
const deleteOne = (Model) => {
	return handleAsyncError(async (req, res, next) => {
		await Model.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: "success",
			data: null,
		});
	});
};

/**
 * @function getOne
 * @description Retrieves a single document by ID.
 * @param {Model} Model - The Mongoose model to retrieve from.
 * @returns {Function} - Express route handler.
 */
const getOne = (Model) => {
	return handleAsyncError(async (req, res, next) => {
		const data = await Model.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data,
		});
	});
};

/**
 * @function getAll
 * @description Retrieves all documents with filtering, sorting, pagination, and field limiting.
 * @param {Model} Model - The Mongoose model to retrieve from.
 * @returns {Function} - Express route handler.
 */
const getAll = (Model) => {
	return handleAsyncError(async function (req, res, next) {
		const features = new ApiFeatures(Model.find(), req.query).filter().sort().limitFields().paginate();
		const data = await features.query;

		res.status(200).json({
			status: "success",
			results: data.length,
			data,
		});
	});
};

export { createOne, updateOne, deleteOne, getOne, getAll };
