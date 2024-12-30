import {handleAsyncError} from "../utils/handleAsyncError.js";
import * as recipeService from "../services/recipeService.js";

const getAllRecipesHandler = handleAsyncError(async function (req, res, next) {
    const data = await recipeService.getAllRecipes();
    return res.status(200).json({
        status: "success",
        data: ["Waiting for FINAL EXAM to end..."]
    });
});

export {getAllRecipesHandler};