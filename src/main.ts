import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import App from './App.vue'

import './style.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import Dialog from 'primevue/dialog';

const pinia = createPinia();
const app = createApp(App);

app.component('Dialog', Dialog)

app.use(pinia);
app.use(PrimeVue);
app.mount('#app');