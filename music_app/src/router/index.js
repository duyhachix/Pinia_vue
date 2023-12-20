import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';

let routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/manage',
    component: Manage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // linkActiveClass: 'text-yellow-500', // set style for active link (new issue)
  linkExactActiveClass: 'text-yellow-500', // set class for the active link (new issue)
});

export default router;
