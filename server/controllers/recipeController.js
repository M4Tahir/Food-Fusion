import RecipeModel from "../models/recipeModel.js";
import * as handleFactory from "./handlerFactory.js";

const getAllRecipes = handleFactory.getAll(RecipeModel);

const getRecipe = handleFactory.getOne(RecipeModel);

const createRecipe = handleFactory.createOne(RecipeModel);

const deleteRecipe = handleFactory.deleteOne(RecipeModel);

const updateRecipe = handleFactory.updateOne(RecipeModel);

export { getAllRecipes, createRecipe, getRecipe, deleteRecipe, updateRecipe };
