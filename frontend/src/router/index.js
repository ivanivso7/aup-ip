import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '../views/LandingPage.vue'
import Home from '../views/Home.vue'
import Kosarica from '../views/Kosarica.vue' // Dodana komponenta košarice

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/filmovi', name: 'Home', component: Home },
  { path: '/kosarica', name: 'Kosarica', component: Kosarica } // Nova ruta
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

// This router configuration sets up two routes:
// 1. The root path (`/`) which loads the `LandingPage` component.
// 2. The `/filmovi` path which loads the `Home` component.



