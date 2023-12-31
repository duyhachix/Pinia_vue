import './assets/base.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// vee-validate plugin
import VeeValidatePlugin from '@/includes/validation';
// firebase
import { auth } from './includes/firebase';

// import Icon directive
import Icon from '@/directives/icon';

import i18n from './includes/i18n';

// this event makes it safe to place vue instance inside of it
let app;
auth.onAuthStateChanged(() => {
  // prevent app from being initialized multiple times
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(ElementPlus);
    app.use(i18n);

    app.directive('icon', Icon);

    app.mount('#app');
  }
});
