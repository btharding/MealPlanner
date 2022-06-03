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
    import DataHandler from '../scripts/DataHandler';
    export default {
        name: "RecipesView",
        components: { NewRecipeForm, RecipeList },
        data () {
            return {
                recipes: [],
            }
        },
        mounted () {
            this.recipes = DataHandler.fetchRecipes();
        },
        methods: {
            updateRecipe(updatedRecipe) {
                this.recipes = DataHandler.addRecipe(updatedRecipe, [...this.recipes]);
            },
            addRecipe(recipe) {
                this.recipes = DataHandler.addRecipe(recipe, this.recipes);
            }
        }
    }
</script>