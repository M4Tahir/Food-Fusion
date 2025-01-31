import {handleAsyncError} from "../utils/handleAsyncError.js";
import * as recipeService from "../services/recipeService.js";

const getAllRecipesHandler = handleAsyncError(async function (req, res, next) {
    const data = await recipeService.getAllRecipes();
    return res.status(200).json({
        status: "success",
        results: data.length,
        data
    });
});

const createRecipeHandler = handleAsyncError(async function (req, res, next) {
    const newRecipe = await recipeService.createRecipe(req.body);
    return res.status(200).json({
        status: "success",
        data: newRecipe
    });
});

export {getAllRecipesHandler, createRecipeHandler};