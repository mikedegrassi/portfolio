import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import ProjectsDetails from '@/views/ProjectsDetails.vue'
import ProjectsList from '@/views/ProjectsList.vue'
import ContactView from '@/views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsList
    },
    {
      path: '/projects/:slugOrId',
      name: 'project-detail',
      component: ProjectsDetails, props: true
    }, {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Als de gebruiker op de terug-knop klikt:
    if (savedPosition) {
      return savedPosition
    } else {
      // Altijd terug naar boven scrollen
      return { top: 0 }
    }
  }
})

export default router
