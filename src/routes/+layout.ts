import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends, url }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const fetchProfile = async (session) => {
		if (!session) return null;

		const { data: profile } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', session?.user?.id)
			.single();

		if (profile) return profile;

		// automatic profile creation
		const { data: newProfile } = await supabase
			.from('profiles')
			.insert([
				{
					id: session?.user?.id,
					avatarUrl: session?.user?.user_metadata?.avatar_url
				}
			])
			.select('*')
			.single();

		return newProfile;
	};

	return { supabase, session, profile: fetchProfile(session) };
};
