type HEXColor = `#${string}`;


type FirebaseProject = {
    name: string,
    todoistId: string,
    togglId: string,
    color: HEXColor
}

type FirebaseUserData = {
    username: string,
    toggltoken: string,
    todotoken:string,
    togglworkspaceid: string,
    projects: FirebaseProject[]
  
  }

export {type HEXColor, type FirebaseProject, type FirebaseUserData}