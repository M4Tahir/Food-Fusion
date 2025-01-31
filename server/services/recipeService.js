import RecipeModel from "../models/recipeModel.js";

const getAllRecipes = async () => {
    const data = await RecipeModel.find({});
    return data;
};


const createRecipe = async (recipeData) => {
    const recipe = await RecipeModel.create(recipeData);
    return recipe;
};

export {getAllRecipes, createRecipe};