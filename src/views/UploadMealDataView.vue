<template>
    <h1>Import Meal Data</h1>
    <form @submit="uploadMealData($event)">
        <textarea name="mealData" placeholder="Paste meal data into here" required></textarea><br/>
        <input type = "submit" value = "Upload"/>
    </form>
</template>

<script>
import DataHandler from '../scripts/DataHandler';
export default {
    methods: {
        uploadMealData(event) {
            event.preventDefault();
            let rawMealData = event.target.mealData.value;
            let mealData = JSON.parse(rawMealData);

            if (!mealData.recipes) {
                alert('Error: Incomplete meal data');
            }
            DataHandler.saveRecipes(mealData.recipes);

            DataHandler.extractIngredientsAndIndexRecipes([], mealData.recipes);

            event.target.mealData.value = '';
        }
    }
}
</script>