type HEXColor = `#${string}`;


type FirebaseProject = {
    name: string,
    todoistId: string,
    togglId: string,
    color: HEXColor
}

export {type HEXColor, type FirebaseProject}