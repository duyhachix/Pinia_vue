import './assets/base.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// vee-validate plugin
import VeeValidatePlugin from '@/includes/validation';
// firebase
import { auth } from './includes/firebase';

// this event makes it safe to place vue instance inside of it
let app;
auth.onAuthStateChanged(() => {
  // prevent app from being initialized multiple times
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);

    app.mount('#app');
  }
});
