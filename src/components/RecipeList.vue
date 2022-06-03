<template>
    <div v-if="recipes.length">
        <h3>Recipes:</h3>
        <div v-for="recipe in recipes" :key="recipe.id">
            <h3 contenteditable v-text="recipe.name" @keydown.enter="$event.target.blur()" @blur="handleRecipeNameChange($event, recipe)"></h3>
            <span v-for = "ingredient in recipe.ingredients" :key = "ingredient.id" v-text="ingredient.name" style="margin: 10px;" contenteditable @blur="handleIngredientChange($event, ingredient, recipe)" @keydown.enter="$event.target.blur()"></span>
            <input type = "text" placeholder="Add new ingredient..." @keydown.enter="addNewIngredient($event, recipe)"/>
        </div>
    </div>
</template>

<script>
import DataHandler from '../scripts/DataHandler';
import Helpers from '../scripts/Helpers';

export default {
    name: "RecipeList",
    data () {
        return {
            'updatedRecipe': {}
        }
    },
    methods: {
        handleRecipeNameChange(event, recipe) {
            let newName = Helpers.cleanText(event.target.innerText);
            let oldName = recipe.name;

            if (newName == oldName) {
                event.target.innerText = oldName;
                return;
            }

            if (newName.length == 0) {
                if (confirm('Are you  sure? This will delete the recipe')) {
                    this.$emit('deleteRecipe', recipe.id);
                } else {
                    event.target.innerText = oldName;
                }
                return;
            }

            this.updatedRecipe = {...recipe};
            this.updatedRecipe.name = newName;
            this.$emit('updateRecipe', this.updatedRecipe);
            this.updatedRecipe = {};
        },
        addNewIngredient(event, recipe) {
            let ingredientName = Helpers.cleanText(event.target.value);
            if (ingredientName.length) {
                this.updatedRecipe = {...recipe};
                this.updatedRecipe.ingredients.push({name: ingredientName});
                this.$emit('updateRecipe', this.updatedRecipe);
                this.updatedRecipe = {};
            }
            event.target.value = '';
            event.target.blur();
        },
        handleIngredientChange(event, ingredient, recipe) {
            let newName = Helpers.cleanText(event.target.innerText);
            let oldName = ingredient.name;

            if (newName == oldName) {
                event.target.innerText = oldName;
                return;
            }

            this.updatedRecipe = {...recipe};

            if (newName.length == 0) {
                if (recipe.ingredients.length == 1) {
                    if (confirm('Are you sure? This will delete the recipe')) {
                        this.$emit('deleteRecipe', recipe.id);
                        this.updatedRecipe = {};
                    } else {
                        event.target.innerText = oldName;
                    }
                    return;
                }
                this.updatedRecipe.ingredients = this.updatedRecipe.ingredients.filter((candidateIngredient) => candidateIngredient.id !== ingredient.id);
            } else {
                this.updatedRecipe.ingredients = this.updatedRecipe.ingredients.map(({id, name, ...candidateIngredient}) => ({id: id, name: (id == ingredient.id ? newName : name), ...candidateIngredient}));
            }

            this.$emit('updateRecipe', this.updatedRecipe);
            this.updatedRecipe = {};
        }
    },
    props: {
        recipes: Array
    }
}
</script>