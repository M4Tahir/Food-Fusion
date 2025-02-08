import {handleAsyncError} from "../utils/handleAsyncError.js";
import * as recipeService from "../services/recipeService.js";
import {deleteRecipe, getRecipe, updateRecipe} from "../services/recipeService.js";

const getAllRecipesHandler = handleAsyncError(async function (req, res, next) {
    const data = await recipeService.getAllRecipes(req.query);
    res.status(200).json({
        status: "success",
        results: data.length,
        data
    });
});

const createRecipeHandler = handleAsyncError(async function (req, res, next) {
    const newRecipe = await recipeService.createRecipe(req.body);
    res.status(200).json({
        status: "success",
        data: newRecipe
    });
});

const getRecipeHandler = handleAsyncError(async (req, res, next) => {
    const data = await getRecipe(req.params.id);
    res.status(200).json({
        status: "success",
        data
    });
});

const deleteRecipeHandler = handleAsyncError(async (req, res, next) => {
    await deleteRecipe(req.params.id);
    res.status(204).json({
        status: "success",
        data: null
    });
});


const updateRecipeHandler = handleAsyncError(async (req, res, next) => {
    const data = await updateRecipe(req.body, req.params.id);
    res.status(200).json({
        status: "success",
        data
    });
});

export {getAllRecipesHandler, createRecipeHandler, getRecipeHandler, deleteRecipeHandler, updateRecipeHandler};