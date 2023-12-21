import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Manage from '@/views/Manage.vue';
import NotFound404 from '@/views/NotFound404.vue';

import useUserStore from '@/stores/user';

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
    path: '/manage-music',
    name: 'manage',
    // alias: '/manage', // same behavior as redirect
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log('manage route Guard');
      next();
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    path: '/404',
    name: 'not-found',
    component: NotFound404,
  },
  {
    path: '/:catchAll(.*)*', // catch all path that doesn't exist
    redirect: { name: 'not-found' }, // redirect to home (or usually 404 page)
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500', // set class for the active link (new issue)
});

router.beforeEach((to, from, next) => {
  // route meta
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  let store = useUserStore();
  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
