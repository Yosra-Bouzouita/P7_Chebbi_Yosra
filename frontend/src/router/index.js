import { createRouter, createWebHashHistory } from 'vue-router'
import Login    from '../views/Login.vue'
import Accueil from '../views/Accueil.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (Signup.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Signup" */ '../views/Signup.vue')
  },
  {
    path: '/Accueil',
    name: 'Accueil',
    component: Accueil,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router