import { collection, getDocs, limit, query, where } from "firebase/firestore";
import type { PageLoad } from "./$types";
import { db } from "$lib/firebase";
import { error } from "@sveltejs/kit";

export const load = (async ({ params }) => {

  let yr:number = parseInt(params.year);
  let mo:number = parseInt(params.month);
  let dy:number = parseInt(params.day);
    
  const collectionRef = collection(db, "users");

  const q = query(
    collectionRef,
    where("username", "==", params.username),
    limit(1)
  );
  const snapshot = await getDocs(q);
  const exists = snapshot.docs[0]?.exists();
  const data = snapshot.docs[0]?.data();
  console.log(data)

  if (!exists) {
    throw error(404, "that user does not exist!");
  }

  if( isNaN(yr) || isNaN(mo) || isNaN(dy) || yr < 2015 || yr > 2125 || mo < 1 || mo > 12 || dy < 1 || dy > 31) {
    throw error(404, "that date does not exist!");
  }

  return {
    username: data.username,
    todotoken: data.todotoken,
    toggltoken: data.toggltoken,
    year: yr,
    day: dy,
    month: mo,
    date: new Date(yr, mo - 1, dy)
  };
}) satisfies PageLoad;