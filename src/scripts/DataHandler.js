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
    addOrUpdateRecipe(recipe, recipes, ingredients) {
        recipe.ingredients = recipe.ingredients.map((ingredient) => this.createNewIngredient(ingredient.name, ingredients));
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
        this.saveRecipes(recipes);
        return recipes;
    },
    fetchIngredients() {
        if (localStorage.ingredients) {
            return JSON.parse(localStorage.ingredients);
        }
        return [];
    },
    saveIngredients(ingredients) {
        localStorage.ingredients = JSON.stringify(ingredients);
    },
    extractIngredientsAndIndexRecipes(oldIngredients, recipes) {
        let ingredients = [];
        let ingredientMap = {};
        for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
            let currentRecipe = recipes[recipeIndex];
            for (let ingredientIndex = 0; ingredientIndex < currentRecipe.ingredients.length; ingredientIndex++) {
                let currentIngredient = this.createNewIngredient(currentRecipe.ingredients[ingredientIndex].name, oldIngredients);
                if (!ingredients.filter(ing => ing.id == currentIngredient.id).length) {
                    ingredients.push(currentIngredient);
                }
                ingredientMap = this.addToIngredientMap(ingredientMap, currentIngredient.id, currentRecipe.id);
            }
        }
        this.saveIngredients(ingredients);
        this.saveIngredientIndex(ingredientMap);
        return ingredients;
    },
    createNewIngredient(ingredientName, ingredients) {
        let ingredient = ingredients.filter((ing) => ing.name.toLowerCase() === ingredientName.toLowerCase());
        if (ingredient.length) {
            return ingredient[0];
        }
        return {name: ingredientName, id: Helpers.generateUniqueId([ingredients])};
    },
    fetchIngredientIndex() {
        return JSON.parse(localStorage.ingredientIndex) ?? [];
    },
    saveIngredientIndex(ingredientIndex) {
        localStorage.ingredientIndex = JSON.stringify(ingredientIndex);
    },
    addToIngredientMap(ingredientMap, ingredientId, recipeId) {
        if (!ingredientMap[ingredientId]) {
            let value = [recipeId];
            ingredientMap[ingredientId] = value;
        } else {
            ingredientMap[ingredientId].push(recipeId);
        }

        return ingredientMap;
    }
}