import IconAdd from '$lib/icons/glue/IconAdd.svelte';
import IconPerson from '$lib/icons/glue/IconPerson.svelte';
import type { IPrivateNav, IPublicNav } from '$lib/types/glue/nav.type';

export const APP_NAME = 'webdev';
export const PUBLIC_NAVS: IPublicNav[] = [
	{
		path: '/team',
		label: 'Team'
	},
	{
		path: '/project',
		label: 'Projects'
	},
	{
		path: '/signin',
		label: 'Sign in'
	}
];
export const PRIVATE_NAVS: IPrivateNav[] = [
	{
		path: '/profile',
		label: 'My profile',
		icon: IconPerson
	},
	{
		path: '/project/create',
		label: 'Register project',
		icon: IconAdd
	}
];
export const IS_ENFORCE_CORNELL_EMAIL = false;
export const IS_BETA = false;
export const SENTRY_DSN_PUBLIC = '';

// used in terms and conditions
export const ADMIN_EMAIL = 'cornellwebdev@gmail.com';
export const PROD_DOMAIN = 'https://www.cornellwebdev.com/';
