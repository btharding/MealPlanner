<template>
     <h2>New recipe:</h2>
    <form @submit="submit">
        <label for = "recipeName">Recipe Name: </label>
        <input name = "recipeName" type = "text" v-model="recipe.name"/><br/>

        <label for = "newIngredient">Ingredients (comma separated): </label>
        <input name = "newIngredient" type = "text" v-model="newIngredient" @input="handleIngredientInput"/>

        <div v-if="recipe.ingredients.length">
            <div v-for="ingredient in recipe.ingredients" :key="ingredient.id" contenteditable @input="updateIngredient($event, ingredient.id)" @blur="cleanupIngredientsList($event, ingredient.id)">{{ingredient.name}}</div>
        </div><br/>


        <div v-if="recipe.ingredients.length">
            <div v-for="ingredient in recipe.ingredients" :key="ingredient.id">{{ingredient.name}}</div>
        </div><br/>

        <input type = "submit" value="Submit"/>
    </form>
</template>

<script>
import helpers from '../scripts/Helpers';
export default {
    name: "NewRecipeForm",
    emits: ["submitRecipe"],
    data () {
        return {
            recipe : {
                name: '',
                ingredients: [],
            },
            newIngredient: ''
        }
    },
    methods: {
        submit(e) {
            e.preventDefault();
            if (!this.recipe.name) {
                alert('Please add a recipe name');
                return;
            }
            if (!this.recipe.ingredients.length) {
                alert('Please include some ingredients');
                return;
            }
            let submittedRecipe = {...this.recipe};
            this.recipe.name = "";
            this.recipe.ingredients = [];
            this.$emit('submitRecipe', submittedRecipe);
        },
        cleanupIngredientsList(event, id) {
            let ingredientName = event.target.innerText;
            if (!ingredientName.length) {
                this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => ingredient.id !== id);
            }
        },
        updateIngredient(event, id) {
            this.recipe.ingredients.find(ingredient => ingredient.id === id).name = event.target.innerText;
        },
        addNewIngredient(ingredientName) {
            let ingredient = {
                name: ingredientName,
                id: helpers.generateUniqueId(this.recipe.ingredients)
            };
            this.recipe.ingredients.push(ingredient);
        },
        handleIngredientInput() {
            if (this.newIngredient.slice(-1) === ',') {
                this.addNewIngredient(this.newIngredient.slice(0,-1));
                this.newIngredient = '';
            }
        }
    }
}
</script>