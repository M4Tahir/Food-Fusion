import RecipeModel from "../models/recipeModel.js";
import ApiFeatures from "../utils/apiFeatures.js";

const getAllRecipes = async (queryString) => {
    const features = new ApiFeatures(RecipeModel.find(), queryString)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const data = await features.query;
    return data;
};


const createRecipe = async (recipeData) => {
    const recipe = await RecipeModel.create(recipeData);
    return recipe;
};

const getRecipe = async (recipeId) => {
    const data = await RecipeModel.findById(recipeId);
    return data;
};

const deleteRecipe = async (recipeId) => {
    await RecipeModel.findByIdAndDelete(recipeId);
    return null;
};

const updateRecipe = async (newData, id) => {
    // new: true -> newly created docs will be returned, and validator will run.
    const data = await RecipeModel.findByIdAndUpdate(id, newData, {new: true, runValidators: true});
    return data;

};
export {getAllRecipes, createRecipe, getRecipe, deleteRecipe, updateRecipe};