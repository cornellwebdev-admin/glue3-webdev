import type { Load } from '@sveltejs/kit';

import { selectedOption } from '$lib/stores/glue/stores';

export const load: Load = async ({ parent }) => {
  const fetchResourcesData = async () => {

    let filter = "ideation";
    const { supabase } = await parent();

    const { data: resourceLinks } = await supabase
      .from('resourceLinks')
      .select()
      .contains('resource_tags', [filter]);

    console.log(resourceLinks);

    return resourceLinks;

  };

  return { resourceLinks: fetchResourcesData() };
};

selectedOption.subscribe(async (value) => {
  
})