<template>
    <div>
        <h3 contenteditable v-text="recipe.name" @keydown.enter="$event.target.blur()" @blur="handleRecipeNameChange($event, recipe)"></h3>
        <div class = "ingredientList">
            <span class="listedIngredient" v-for = "ingredient in recipe.ingredients" :ref="ingredient.id" :key="ingredient.id" v-text="ingredient.name" @blur="handleIngredientChange($event, ingredient, recipe)" @keydown.enter="$event.target.blur()" contenteditable></span>
            <input type = "text" placeholder="Add new ingredient..." @keydown.enter="addNewIngredient($event, recipe)"/>
        </div>
    </div>
</template>

<style scoped>
    .ingredientList {
        width: 100%;
        display: inline;
    }

    .listedIngredient {
        margin: 5px;
        position: relative;
        /* background-color: red; */
    }
</style>

<script>
import Helpers from '../scripts/Helpers'

export default {
    name: "RecipeListRecipe",
    props: {
        recipe: Object
    },
    data() {
        return {
            alertTimeSeconds: '1s',
            alertTimeMs: 1000,
        }
    },
    methods: {
        handleRecipeNameChange(event, recipe) {
            let newName =  Helpers.cleanText(event.target.innerText);
            let oldName = recipe.name;

            if (newName == oldName) {
                event.target.innerText = oldName;
                return;
            }

            if (newName.length == 0) {
                if (confirm('Are you sure? This will delete the recipe!')) {
                    this.$emit('deleteRecipe', recipe.id);
                } else {
                    event.target.innerText = oldName;
                }
                return;
            }

            let updatedRecipe = {...recipe};
            updatedRecipe.name = newName;
            this.$emit("updateRecipe", updatedRecipe);
        },
        handleIngredientChange(event, ingredient, recipe) {
            let newName = Helpers.cleanText(event.target.innerText);
            let oldName = ingredient.name;

            if (newName == oldName) {
                event.target.innerText = oldName;
                return;
            }

            let updatedRecipe = {...recipe};

            if (newName.length == 0) {
                if (recipe.ingredients.length == 1) {
                    if (confirm("Are you sure? This will delete the recipe!")) {
                        this.$emit("deleteRecipe", recipe.id);
                    } else {
                        event.target.innerText = oldName;
                    }
                    return;
                }
                updatedRecipe = this.updatedRecipe.ingredients.filter((candidateIngredient) => candidateIngredient.id !== ingredient.id);
            } else {
                updatedRecipe.ingredients = updatedRecipe.ingredients.map(({ id, name, ...candidateIngredient }) => ({ id: id, name: (id == ingredient.id ? newName : name), ...candidateIngredient }));
            }
            this.$emit("updateRecipe", updatedRecipe);
        },
        addNewIngredient(event, recipe) {
            let ingredientName = Helpers.toUpperCamelCase(event.target.value);

            if (ingredientName.length) {
                let updatedRecipe = {...recipe};
                let existingIngredient = updatedRecipe.ingredients.filter(ingredient => ingredient.name === ingredientName);
                if (!existingIngredient[0]) {
                    updatedRecipe.ingredients.push({name: ingredientName});
                    this.$emit("updateRecipe", updatedRecipe);
                } else {
                    let target = this.$refs[existingIngredient[0].id][0];
                    Helpers.errorFlash(target);
                }
            }
            event.target.value="";
            event.target.blur();
        },
    },
    emits: ["updateRecipe", "deleteRecipe"],
}
</script>