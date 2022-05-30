<template>
    <div>
        <h1>Recipes</h1>
        <NewRecipeForm @submitRecipe="addRecipe($event)"></NewRecipeForm>
        <RecipeList :recipes="recipes"></RecipeList>
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
            addRecipe(recipe) {
                recipe.id = helpers.generateUniqueId(this.recipes);
                this.recipes.push(recipe);
                localStorage.recipes = JSON.stringify(this.recipes);
            }
        }
    }
</script>