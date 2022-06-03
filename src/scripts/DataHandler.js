import Helpers from "./Helpers";

export default {
    fetchRecipes() {
        if (localStorage.recipes) {
            return JSON.parse(localStorage.recipes);
        }
        return [];
    },
    saveRecipes(recipes) {
        localStorage.recipes = JSON.stringify(recipes);
    },
    addRecipe(recipe, recipes) {
        if ("id" in recipe) {
            if (recipe.ingredients.length) {
                recipes = recipes.map((candidateRecipe) => candidateRecipe.id == recipe.id ? recipe : candidateRecipe);
            } else {
                recipes = recipes.filter((candidateRecipe) => candidateRecipe.id !== recipe.id);
            }
        } else {
            recipe.id = Helpers.generateUniqueId(recipes);
            recipes.push(recipe);
        }
        //TODO: For each ingredient, add ingredient if new
        //TODO: Index this recipe by all ingredients
        this.saveRecipes(recipes);
        return recipes;
    },
    createNewIngredient(ingredientName) {
        //TODO: Properly index ingredients using correct ID's
        return {name: ingredientName, id: Helpers.generateUniqueId([])};
    }
}