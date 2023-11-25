import { createApp } from 'vue';
import App from './App.vue';
import './src/styles/dark.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import ContextMenu from '@imengyu/vue3-context-menu';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
const app = createApp(App);
app.use(ContextMenu);
app.mount('#app');