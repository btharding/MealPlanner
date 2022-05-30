<template>
    <div v-if="recipes.length">
        <h3>Recipes:</h3>
        <div v-for="recipe in recipes" :key="recipe.id">
            <h3>{{recipe.name}}</h3>
            <span v-for = "ingredient in recipe.ingredients" :key = "ingredient.id">{{ingredient.name}}<br/></span>
        </div>
    </div>
</template>

<script>
export default {
    name: "RecipeList",
    props: {
        recipes: Array
    }
}
</script>