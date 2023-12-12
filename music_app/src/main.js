import './assets/base.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// vee-validate plugin
import VeeValidatePlugin from '@/includes/validation';
// firebase
import './includes/firebase';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VeeValidatePlugin);

app.mount('#app');
