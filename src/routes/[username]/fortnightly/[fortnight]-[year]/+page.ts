import type { PageLoad } from './$types';
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { error } from '@sveltejs/kit';
import { db } from '$lib/stores/firebaseStore';

export const load = (async ({params}) => {
    let yr = parseInt(params.year);
    let ftn = parseInt(params.fortnight)

    const collectionRef = collection(db, "users");

  const q = query(
    collectionRef,
    where("username", "==", params.username),
    limit(1)
  );
  const snapshot = await getDocs(q);
  const exists = snapshot.docs[0]?.exists();
  const data = snapshot.docs[0]?.data();

    if( isNaN(yr) || isNaN(ftn) || yr < 2015 || yr > 2125 || ftn < 1 || ftn > 26 ) {
        throw error(404, "that fortnight does not exist!");
      }

    if(!exists) {
        throw error(404, "that user does not exist!");
    }

    return {
        year: yr,
        fortnight: ftn,
        username: data.username,
        todotoken: data.todotoken,
        toggltoken: data.toggltoken,
    };
}) satisfies PageLoad;