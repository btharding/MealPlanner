import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RecipesView from '../views/RecipesView.vue';
import MealPlanView from '../views/MealPlanView.vue';
import NewPlanView from '../views/NewPlanView.vue';
import UploadMealDataView from '../views/UploadMealDataView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: RecipesView
    },
    {
      path: '/new-meal-plan',
      name: 'new-meal-plan',
      component: NewPlanView
    },
    {
      path: '/meal-plan',
      name: 'meal-plan',
      component: MealPlanView
    },
    {
      path: '/upload-meal-data',
      name: 'upload-meal-data',
      component: UploadMealDataView
    },
  ]
});

export default router;
