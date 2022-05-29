<template>
    <div>
        <h1>Recipes</h1>
        <h2>New recipe:</h2>
        <form @submit="submit">
            <label for = "recipeName">Recipe Name: </label>
            <input name = "recipeName" type = "text" v-model="currentRecipe.name"/><br/>

            <label for = "newIngredient">Ingredients (comma separated): </label>
            <input name = "newIngredient" type = "text" v-model="currentIngredient" @input="handleIngredientChange"/>

            <div v-if="currentRecipe.ingredients">
                <div class = "newIngredientsListContainer">
                    <div class = "newIngredient" v-for="ingredient in currentRecipe.ingredients" :key = "ingredient.id" contenteditable @input="changeee($event, ingredient)">{{ingredient.name}}</div>
                </div>
            </div><br/>

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

<style scoped>
    .newIngredientsListContainer{
        display: flex;
        align-items: flex-start;
    }

    .newIngredient {
        margin: 5px 10px 5px 0px;
        border: 1px solid lightgray;
    }
</style>

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
            changeee(e, ingredient) {
                ingredient.name = e.target.innerText;
                //TODO -> Ensure this correctly handles "addNewIngredient"
            },
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