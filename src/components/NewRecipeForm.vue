<template>
     <h2>New recipe:</h2>
    <form @submit="submit">
        <label for = "recipeName">Recipe Name: </label>
        <input name = "recipeName" type = "text" v-model="recipe.name"/><br/>

        <label for = "newIngredient">Ingredients (comma separated): </label>
        <input name = "newIngredient" type = "text" v-model="newIngredient" @input="handleIngredientInput"/>

        <div v-if="recipe.ingredients.length">
            <div v-for="ingredient in recipe.ingredients" :key="ingredient.id" :ref="ingredient.id" contenteditable @input="updateIngredient($event, ingredient.id)" @blur="cleanupIngredientsList()" v-text="ingredient.name"></div>
        </div><br/>
        <input type = "submit" value="Submit"/>
    </form>
</template>

<script>
import Helpers from '../scripts/Helpers';
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
            this.recipe.ingredients = this.recipe.ingredients.map(({name, ...ingredient}) => ({name: name}));
            this.$emit('submitRecipe', {...this.recipe});
            this.recipe.name = "";
            this.recipe.ingredients = [];
        },
        cleanupIngredientsList() {
            console.log('a');
            this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => ingredient.name.length);

            let tempIngredientList = [];
            this.recipe.ingredients.forEach(function (ingredient) {
                if (!tempIngredientList.filter(ingredientInList => ingredientInList.name == ingredient.name)[0]) {
                    tempIngredientList.push(ingredient);
                }
            });
            this.recipe.ingredients = tempIngredientList;
        },
        updateIngredient(event, id) {
            this.recipe.ingredients.find(ingredient => ingredient.id === id).name = event.target.innerText;
        },
        addNewIngredient(ingredientName) {
            ingredientName = Helpers.toUpperCamelCase(ingredientName);
            if (this.checkForAndHandleDuplicates(ingredientName)) {
                this.recipe.ingredients.push({name: ingredientName, id: Helpers.generateUniqueId(this.recipe.ingredients)});
            }
        },
        checkForAndHandleDuplicates(ingredientName) {
            let existing = this.recipe.ingredients.filter(ingredient => ingredient.name === ingredientName);

            if (!existing[0]) {
                return true;
            }

            let target = this.$refs[existing[0].id][0];
            Helpers.errorFlash(target);
            return false;
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