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
})

export default router
