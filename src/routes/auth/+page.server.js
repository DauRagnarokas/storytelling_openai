import { fail, redirect } from '@sveltejs/kit'
import { Routes } from '$lib/routes'
export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData()
		const username = data.get('username')
		const password = data.get('password')
		if (!username || !password) {
			return fail(400, { username, message: 'Missing username or password' })
		}
		cookies.set('username', username, { path: Routes.home })
		throw redirect(303, Routes.home)
	},
	logout: async ({ request, cookies }) => {
		console.log('logout action')
		cookies.delete('username')
		throw redirect(303, Routes.home)
	}
}
