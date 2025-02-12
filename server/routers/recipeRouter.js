import express from "express";

import * as recipesController from "../controllers/recipeController.js";


const router = express.Router();


router.route("/")
    .get(recipesController.getAllRecipes)
    .post(recipesController.createRecipe);

router.route("/:id")
    .get(recipesController.getRecipe)
    .delete(recipesController.deleteRecipe)
    .patch(recipesController.updateRecipe);

export default router;