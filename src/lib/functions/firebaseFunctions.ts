import { doc, updateDoc, getDoc } from "firebase/firestore";
import type { FirebaseProject } from "../types/firebase_types";
import { db } from "$lib/stores/firebaseStore";
import { fetchTogglProjects } from "./togglFunctions";
import { fetchTodoistProjects } from "./todoistFunctions";
import { writeBatch } from "firebase/firestore";
import { togglWorkspaceId, togglProjects } from "$lib/stores/togglStore";
import { todoistProjects } from "$lib/stores/todoistStore";
import { user, userData } from "$lib/stores/firebaseStore";
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

await refreshProjects();



}


export async function refreshProjects() {
    let currentProjects: FirebaseProject[] = [];
    let currentUser : User | null = null;
    let currentUserData : any;
    let todoProjectsRefresh: [any];
    let togglProjectsRefresh: [any];

    user.subscribe((value) => {  currentUser = value;});
    userData.subscribe((value) => {  currentUserData = value;});

    const docRef = doc(db, "users", currentUser!.uid);
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()&&docSnap.data().projects)
      currentProjects = docSnap.data().projects;

    await fetchTodoistProjects(currentUserData.todotoken);
    await fetchTogglProjects(currentUserData.toggltoken, currentUserData.workspaceid);


    togglProjects.subscribe((value) => { togglProjectsRefresh = value;});
    todoistProjects.subscribe((value) => { todoProjectsRefresh = value;});

    let isUpdated = false;

    togglProjectsRefresh.forEach((project) => {
      let name = project.name;
      let isInFirebase = false;
      for(let i = 0; i < currentProjects.length; i++){ 
        if(currentProjects[i].name == name){
          isInFirebase = true;
          break;
        }
        }
      
        if(!isInFirebase){
          for(let i = 0; i < todoProjectsRefresh.length; i++){
            if(todoProjectsRefresh[i].name == name){
              currentProjects.push({
                name: name,
                todoistId: todoProjectsRefresh[i].id,
                togglId: project.id,
                color: project.color
              })
              isUpdated = true;
              break;
            }
          }
        }
      });

      console.log(currentProjects);

      if(isUpdated){
       await updateDoc(docRef, { projects: currentProjects });
        console.log(currentProjects);
        isUpdated = false;
      }
  }

    
  
  

  export function todoistProjectIdToName(id:string) {  
    let name = "";
    todoistProjects.subscribe((value) => { value.forEach((project) => { if(project.id == id) name = project.name; })});
    return name; 
  
  }

