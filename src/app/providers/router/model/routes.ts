import { CleanLayout } from '@/app/layouts'
import { AppRoutes } from './types.ts'

let routes = [
	{
		path: AppRoutes.HOME,
		name: 'home',
		component: () => import('@/pages/home-page'),
		meta: {
			layout: CleanLayout,
		},
	},

	{
		path: '/:pathMatch(.*)',
		component: () => import('@/pages/not-found'),
		meta: {
			layout: CleanLayout,
		},
	},
]

const devRoutes = [
	{
		path: AppRoutes.UI,
		name: 'ui',
		component: () => import('@/pages/ui-page'),
	},
	{
		path: AppRoutes.FORM,
		name: 'form',
		component: () => import('@/pages/form-page'),
	},
	{
		path: AppRoutes.INFO,
		name: 'info',
		component: () => import('@/pages/info-page'),
		meta: {
			layout: CleanLayout,
		},
	},
	{
		path: AppRoutes.MAIN,
		name: 'main',
		component: () => import('@/pages/main-page'),
		meta: {
			layout: CleanLayout,
		},
	},
]

if (window.MODE === 'DEV') {
	//@ts-ignore
	routes = [...routes, ...devRoutes]
}

export { routes }
