import express from "express";
import * as authController from "../controllers/authenticationController.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);


// Admin routes.
router.route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.get("/:id", userController.getUser);

// user Routes
router.route("/:id")
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

export default router;