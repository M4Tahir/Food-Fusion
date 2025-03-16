import express from "express";
import * as authController from "../controllers/authenticationController.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:resetToken", authController.resetPassword);


router.use(authController.protect);

router.get("/me", userController.getMe, userController.getUser);
router.patch("/update-password", authController.updateMyPassword);

router.patch("/update-me", userController.updateMe);
router.delete("/delete-me", userController.deleteMe);


router.use(authController.restrictTo("admin"));
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