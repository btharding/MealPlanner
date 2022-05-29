<template>
    <div>
        <h1>New Recipe</h1>
        <h2 v-if="recipes.length">Recipes found</h2>
        <h2 v-else>No recipes found</h2>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                recipes: []
            }
        },
        mounted () {
            if (localStorage.recipes) {
                this.recipes = localStorage.recipes
            }
        }
    }
</script>