import isConnected from "./components/isConnected.vue"
import Dashboard from "./pages/dashboard.vue"
import Connect from "./pages/connect.vue"

const routes = [
	{
		path: '/',
		component: isConnected,
		name: 'isConnected',
	},
	{
		path: '/connect',
		component: Connect,
		name: 'connect',
	},
	{
		path: '/dashboard',
		component: Dashboard,
		name: 'dashboard',
	},
]