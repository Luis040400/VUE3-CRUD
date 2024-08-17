import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../views/Layout/LayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AdminLayout,
      children: [
        {
          path: '/applications',
          name: 'applications',
          component: () => import('../views/pages/applications/ApplicationView.vue')
        },
        {
          path: '/categories',
          name: 'categories',
          component: () => import('../views/pages/categories/CategoriesView.vue')
        }
      ]
    }
  ]
})

export default router
