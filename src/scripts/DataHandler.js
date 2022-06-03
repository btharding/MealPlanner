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
    deleteRecipe(recipeId, recipes) {
        recipes = recipes.filter((recipe) => recipe.id !== recipeId);
        this.saveRecipes(recipes);
        return recipes;
    },
    addOrUpdateRecipe(recipe, recipes) {
        if ("id" in recipe) {
            if (recipe.ingredients.length) {
                recipes = recipes.map((candidateRecipe) => candidateRecipe.id == recipe.id ? recipe : candidateRecipe);
            } else {
                console.error('Handling recipe deletion in addRecipe. This should be done in deleteRecipe');
                return this.deleteRecipe(recipe.id, recipes);
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