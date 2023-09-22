import { writable } from 'svelte/store';


// Initialize the store with an empty object
const togglProjects = writable<any>({});
const togglWorkspaceId =  writable<any>({});
const SERVER_PORT =  '3001';

async function getTogglWorkspace(apitoken:string ) {
    
    let customHeaders = new Headers()
    customHeaders.append('apitoken', apitoken);

    try{
        const authResponse = await fetch('http://localhost:'+SERVER_PORT+'/api/toggl-auth',  { headers : customHeaders } );
        const authData = await authResponse.json();
        console.log('Auth Data:', authData);
        togglWorkspaceId.set(authData.default_workspace_id);

    } catch (error) {
        console.error(error);
        // Handle the error
      }

}

// Fetch Toggl data from the Express API
async function fetchTogglProjects() {
  try {

    let customHeaders = new Headers()
    customHeaders.append('apitoken', 'eb5f0f751ab4079e0f7de08feab2d2a8');
    customHeaders.append('workspaceid', '1955294');
    const dataResponse = await fetch('http://localhost:'+SERVER_PORT+'/api/toggl/projects', { headers : customHeaders });
    
    const data = await dataResponse.json();
    console.log('Response Text:', data);

    togglProjects.set(data);
  } catch (error) {
    console.error(error);
    // Handle the error
  }
}

// Export the store and the fetch function
export { togglProjects, togglWorkspaceId, fetchTogglProjects, getTogglWorkspace};