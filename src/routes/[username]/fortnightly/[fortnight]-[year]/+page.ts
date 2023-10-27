import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { user } from '$lib/stores/firebaseStore';

export const load = (async ({params}) => {
    let yr = parseInt(params.year);
    let ftn = parseInt(params.fortnight)

    await user.known

    if( isNaN(yr) || isNaN(ftn) || yr < 2015 || yr > 2125 || ftn < 1 || ftn > 26 ) {
        throw error(404, "that fortnight does not exist!");
      }

    return {
        year: yr,
        fortnight: ftn
    };
}) satisfies PageLoad;