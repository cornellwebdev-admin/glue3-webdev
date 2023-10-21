import IconAdd from '$lib/icons/glue/IconAdd.svelte';
import type { IPrivateNav, IPublicNav } from '$lib/types/glue/nav.type';

export const APP_NAME = 'webdev';
export const PUBLIC_NAVS: IPublicNav[] = [
	{
		path: '/team',
		label: 'Team'
	},
	{
		path: '/resources',
		label: 'Resources'
  },
  {
		path: '/project',
		label: 'Projects'
	}
];
export const PRIVATE_NAVS: IPrivateNav[] = [
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
export const ADMIN_EMAIL = 'referhub.team@gmail.com';
export const PROD_DOMAIN = 'https://www.referhub.org';
