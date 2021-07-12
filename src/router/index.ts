import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/users',
    name: 'UserPage',
      component: () => import('../views/UserPage.vue')
  },
  {
    path: '/roles',
    name: 'RolePage',
    component: () => import('../views/RolePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
