import express from "express";

import * as recipesController from "../controllers/recipeController.js";


const router = express.Router();


router.route("/")
    .get(recipesController.getAllRecipesHandler)
    .post(recipesController.createRecipeHandler);

router.route("/:id")
    .get(recipesController.getRecipeHandler)
    .delete(recipesController.deleteRecipeHandler)
    .patch(recipesController.updateRecipeHandler);

export default router;