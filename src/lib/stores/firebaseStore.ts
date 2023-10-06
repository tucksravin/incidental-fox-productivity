// Import the functions you need from the SDKs you need
// Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//TODO: make a project store that is ground truth to relate project ids from toggl and todoist and integrates their colors

import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived } from "svelte/store";
import type { FirebaseProject } from "../types/firebase_types";

const firebaseConfig = {
    apiKey: "AIzaSyCoBBpuTvTst-S1teDIJHmRYYAVzXIA8wc",
    authDomain: "incidental-fox-productivity.firebaseapp.com",
    projectId: "incidental-fox-productivity",
    storageBucket: "incidental-fox-productivity.appspot.com",
    messagingSenderId: "745521875483",
    appId: "1:745521875483:web:cd1cbec740fec190bb06be",
    measurementId: "G-8KR7D214LT"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
export const firebaseLoading = writable<boolean>(false);






/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();

/**
 * @param  {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(
    path: string,
  ) {
    let unsubscribe: () => void;
  
    const docRef = doc(db, path);
  
    const { subscribe } = writable<T | null>(null, (set) => {
      unsubscribe = onSnapshot(docRef, (snapshot) => {
        set((snapshot.data() as T) ?? null);
      });
  
      return () => unsubscribe();
    });
  
    return {
      subscribe,
      ref: docRef,
      id: docRef.id,
    };
  }

  interface UserData {
    username: string,
    toggltoken: string,
    todotoken:string,
    togglworkspaceid: string,
    projects: FirebaseProject[]
  
  }
  
  export const userData: Readable<UserData | null> = derived(user, ($user, set) => { 
    if ($user) {
      return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
    } else {
      set(null); 
    }
  });
  
