<template>
    <div v-if="recipes.length">
        <h3>Recipes:</h3>
        <div v-for="recipe in recipes" :key="recipe.id">
            <h3>{{recipe.name}}</h3>
            <span v-for = "ingredient in recipe.ingredients" :key = "ingredient.id" v-text="ingredient.name" style="margin: 10px;" contenteditable @blur="handleIngredientChange($event, ingredient, recipe)" @keydown.enter="$event.target.blur()"></span>
        </div>
    </div>
</template>

<script>
import Helpers from '../scripts/Helpers';

export default {
    name: "RecipeList",
    data () {
        return {
            'updatedRecipe': {}
        }
    },
    methods: {
        handleIngredientChange(event, ingredient, recipe) {
            let newName = Helpers.cleanText(event.target.innerText);
            console.log(newName);

            let oldName = ingredient.name;
            console.log(oldName);

            if (newName == oldName) {
                event.target.innerText = oldName;
                return;
            }

            this.updatedRecipe = {...recipe};

            if (newName.length == 0) {
                if (recipe.ingredients.length == 1) {
                    if (!confirm('Are you sure? This will delete the recipe')) {
                        event.target.innerText = oldName;
                        return;
                    }
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