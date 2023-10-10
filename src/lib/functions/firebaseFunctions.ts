import { doc, onSnapshot, getDoc } from "firebase/firestore";
import type { FirebaseProject } from "../types/firebase_types";
import { db } from "$lib/stores/firebaseStore";
import { writeBatch } from "firebase/firestore";
import { togglWorkspaceId } from "$lib/stores/togglStore";
import { user } from "$lib/stores/firebaseStore";
import type { User } from "firebase/auth"








export async function createUserAccount(username:string, toggltoken:string, todotoken:string){

  console.log("creating acct for: ", username)

  let currentUser : User | null = null;
  let workspaceid : string | null = null;

  user.subscribe((value) => {  currentUser = value;});
  togglWorkspaceId.subscribe((value) => { workspaceid = value;});



  const batch = writeBatch(db);
  batch.set(doc(db, "handles", username), { uid: currentUser?.uid })
  batch.set(doc(db, "users", currentUser!.uid),{
      username,
      toggltoken,
      workspaceid,
      todotoken
  })

await batch.commit();

}


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

