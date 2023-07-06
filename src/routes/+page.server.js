import { redirect } from '@sveltejs/kit'
import { Routes } from '$lib/routes'

export const load = ({ cookies }) => {
	if (!cookies.get('username')) {
		throw redirect(307, Routes.login)
	}
}
