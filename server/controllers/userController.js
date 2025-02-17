import * as factory from "./handlerFactory.js";
import UserModel from "../models/userModel.js";


const getAllUsers = factory.getAll(UserModel);

// Admin-only route.
const createUser = function (req, res) {
    res.status(500).json({
        status: "Internal server error", message: "route is not yet defined, please use signup."
    });
};

const getUser = factory.getOne(UserModel);

const updateUser = factory.updateOne(UserModel);

const deleteUser = factory.deleteOne(UserModel);

export {getAllUsers, createUser, getUser, updateUser, deleteUser};