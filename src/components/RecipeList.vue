<template>
    <div v-if="recipes.length">
        <h3>Recipes:</h3>
        <div v-for="recipe in recipes" :key="recipe.id">
            <h3>{{recipe.name}}</h3>
            <span v-for = "ingredient in recipe.ingredients" :key = "ingredient.id" :contenteditable="recipe.ingredients.length > 1" @keydown.enter="$event.target.blur()" @input="updateRecipe($event, recipe, ingredient.id)" @blur="submitRecipe($event, ingredient)" v-text="ingredient.name" style="margin: 10px;"></span>
        </div>
    </div>
</template>

<script>
import Helpers from '../Helpers';

export default {
    name: "RecipeList",
    data () {
        return {
            'updatedRecipe': {}
        }
    },
    methods: {
        submitRecipe(event, ingredient) {
            console.log(JSON.stringify(this.updatedRecipe));
            this.updatedRecipe.ingredients = this.updatedRecipe.ingredients.filter((ingredient) => ingredient.name.length);
            console.log(JSON.stringify(this.updatedRecipe));
        },
        updateRecipe(event, recipe, ingredientId) {
            this.updatedRecipe = recipe;
            // console.log(JSON.stringify(this.updatedRecipe));
            this.updatedRecipe.ingredients = this.updatedRecipe.ingredients.map(({name, ...ingredient}) => ({...ingredient, name: ingredient.id === ingredientId ? Helpers.cleanText(event.target.innerText) : name}));
            // console.log(JSON.stringify(this.updatedRecipe));
        }
    },
    props: {
        recipes: Array
    }
}
</script>