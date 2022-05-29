<template>
    <div>
        <h1>Recipes</h1>
        <h2>New recipe:</h2>
        <form @submit="submit">
            <label for = "recipeName">Recipe Name: </label>
            <input name = "recipeName" type = "text" v-model="currentRecipe.name"/><br/>

            <label for = "newIngredient">Ingredients (comma separated): </label>
            <input name = "newIngredient" type = "text" v-model="currentIngredient" @input="handleIngredientChange"/>

            <ul v-if="currentRecipe.ingredients">
                <li v-for="ingredient in currentRecipe.ingredients" :key = "ingredient.id">{{ingredient.name}}</li>
            </ul><br/>

            <input type = "submit" value="Submit"/>
        </form>

        <div v-if = "recipes.length">
            <h3>Recipes:</h3>

            <div v-for = "recipe in recipes" :key="recipe.id">
                <h3>{{recipe.name}}</h3>
                <span v-for = "ingredient in recipe.ingredients" :key = "ingredient.id" :style = "{color: '#' + ingredient.id.slice(7)}">{{ingredient.name}}</span>
            </div>
        </div>

        <h3 v-else>No recipes found</h3>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                currentRecipe: {
                },
                currentIngredient: '',
                recipes: [],
                ingredients: [],
            }
        },
        mounted () {
            if (localStorage.recipes) {
                this.recipes = JSON.parse(localStorage.recipes);
            }
            if (localStorage.ingredients) {
                this.ingredients = JSON.parse(localStorage.ingredients);
            }
        },
        methods: {
            generateUniqueId(existingArray) {
                while (true) {
                    let candidateId = Math.random().toString(16).slice(2);
                    if (!existingArray.filter(item => item.id == candidateId).length) {
                        return candidateId;
                    }
                }
            },
            submit(e) {
                e.preventDefault();

                if (!this.currentRecipe.name) {
                    alert('Please add a recipe name');
                    return;
                }

                if (!this.currentRecipe.ingredients) {
                    alert('Please add some ingredients');
                    return;
                }

                this.currentRecipe.id = this.generateUniqueId(this.recipes);

                this.recipes.push(this.currentRecipe);
                localStorage.recipes = JSON.stringify(this.recipes);
                localStorage.ingredients = JSON.stringify(this.ingredients);
                this.currentRecipe = {};
                this.currentIngredient = '';
            },
            addNewIngredient(ingredientName) {
                if (!this.currentRecipe.ingredients) {
                    this.currentRecipe.ingredients = [];
                }
                let matchingIngredients = this.ingredients.filter(ingredient => ingredient.name.toLowerCase() == ingredientName.toLowerCase());

                let ingredient = null;
                if (matchingIngredients.length) {
                    ingredient = matchingIngredients[0];
                } else {
                    ingredient = {
                        'name': ingredientName,
                        'id': this.generateUniqueId(this.recipes)
                    }
                    this.ingredients.push(ingredient);
                }
                this.currentRecipe.ingredients.push(ingredient);
            },
            handleIngredientChange() {
                if (this.currentIngredient.slice(-1) === ',') {
                    this.addNewIngredient(this.currentIngredient.slice(0,-1));
                    this.currentIngredient = '';
                }
            }
        }
    }
</script>