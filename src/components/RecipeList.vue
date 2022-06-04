<template>
    <div v-if="recipes.length">
        <h3>Recipes:</h3>
        <div v-for="recipe in recipes" :key="recipe.id">
            <RecipeListRecipe :recipe = "recipe" @deleteRecipe="this.$emit('deleteRecipe', $event)" @updateRecipe="this.$emit('updateRecipe', $event)"></RecipeListRecipe>
        </div>
    </div>
</template>

<script>
import RecipeListRecipe from './RecipeListRecipe.vue';

export default {
    name: "RecipeList",
    data() {
        return {
            "updatedRecipe": {}
        };
    },
    props: {
        recipes: Array
    },
    components: { RecipeListRecipe },
    emits: ["updateRecipe", "deleteRecipe"],
}
</script>