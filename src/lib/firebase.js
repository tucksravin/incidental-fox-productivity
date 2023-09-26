// Import the functions you need from the SDKs you need
// Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, derived } from "svelte/store";
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
/**
 * @returns a store with the current firebase user
 */
function userStore() {
    let unsubscribe;
    if (!auth || !globalThis.window) {
        console.warn('Auth is not initialized or not in browser');
        const { subscribe } = writable(null);
        return {
            subscribe,
        };
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
export function docStore(path) {
    let unsubscribe;
    const docRef = doc(db, path);
    const { subscribe } = writable(null, (set) => {
        unsubscribe = onSnapshot(docRef, (snapshot) => {
            set(snapshot.data() ?? null);
        });
        return () => unsubscribe();
    });
    return {
        subscribe,
        ref: docRef,
        id: docRef.id,
    };
}
export const userData = derived(user, ($user, set) => {
    if ($user) {
        return docStore(`users/${$user.uid}`).subscribe(set);
    }
    else {
        set(null);
    }
});
//# sourceMappingURL=firebase.js.map