import { doc, getFirestore, onSnapshot, getDoc } from "firebase/firestore";
import type { FirebaseProject } from "../types/firebase_types";
import { db } from "$lib/stores/firebaseStore";

export async function refreshProjects(username: string, toggltoken:string, todotoken:string): Promise<FirebaseProject[]> {
    let currentProjects = [];
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists())
      currentProjects = docSnap.data().projects;
    
    //TODO: get and process toggl projects

    //TODO: get and process todoist projects
  
    return currentProjects;
  }

