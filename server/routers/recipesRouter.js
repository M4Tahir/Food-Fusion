import express from "express";

import * as recipesController from "../controllers/recipesController.js";


const router = express.Router();


router.route("/").get(recipesController.getAllRecipesHandler);

export default router;