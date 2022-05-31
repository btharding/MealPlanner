<template>
    <div>
        <h1>Recipes</h1>
        <NewRecipeForm @submitRecipe="addRecipe($event)"></NewRecipeForm>
        <RecipeList :recipes="recipes" @updateRecipe="updateRecipe($event)"></RecipeList>
    </div>
</template>

<script>
    import NewRecipeForm from '../components/NewRecipeForm.vue';
    import RecipeList from '../components/RecipeList.vue';
    import helpers from '../Helpers';
    export default {
        name: "RecipesView",
        components: { NewRecipeForm, RecipeList },
        data () {
            return {
                recipes: [],
            }
        },
        mounted () {
            if (localStorage.recipes) {
                this.recipes = JSON.parse(localStorage.recipes);
            }
        },
        methods: {
            updateRecipe(updatedRecipe) {
                this.recipes = this.recipes.map((recipe) => recipe.id === updatedRecipe.id ? updatedRecipe : recipe);
                this.saveRecipes();
            },
            saveRecipes() {
                localStorage.recipes = JSON.stringify(this.recipes);
            },
            addRecipe(recipe) {
                //TODO: Add correct ID's for ingredients
                //TODO: Save recipe ID's indexed by ingredient ID's for searching
                recipe.id = helpers.generateUniqueId(this.recipes);
                this.recipes.push(recipe);
                this.saveRecipes();
            }
        }
    }
</script>