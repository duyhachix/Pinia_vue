import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';

let routes = [
  {
    path: '/',
    name: 'home', // use name to redirect so in the future we don't have worry about 'path'
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/manage',
    name: 'manage',
    component: Manage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500', // set class for the active link (new issue)
});

export default router;
