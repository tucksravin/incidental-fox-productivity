type HEXColor = `#${string}`;


type FirebaseProject = {
    name: string,
    todoistId: string,
    togglId: string,
    color: string
}

type FirebaseUserData = {
    username: string,
    toggltoken: string,
    todotoken:string,
    togglworkspaceid: string,
    projects: FirebaseProject[]
  
  }

export { type FirebaseProject, type FirebaseUserData}