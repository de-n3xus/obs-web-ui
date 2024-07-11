import Dashboard from "./pages/dashboard.vue"
import { createRouter, createWebHistory } from "vue-router"
import Preview from "./pages/preview.vue"

const routes = [
	{
		path: '/',
		component: Dashboard,
		name: 'dashboard',
	},
	{
		path: '/preview/:uuid',
		component: Preview,
		name: 'preview',
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
