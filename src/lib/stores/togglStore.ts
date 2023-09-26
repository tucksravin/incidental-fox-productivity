import { writable } from 'svelte/store';
import { Base64 } from 'js-base64';
import { db, user, userData } from "$lib/firebase";




// Initialize the store with an empty object
const togglProjects = writable<any>({});
const togglWorkspaceId =  writable<any>({});
const SERVER_PORT =  '3001';

async function getTogglWorkspace(apitoken:string ) {
    
    let customHeaders = new Headers()
    customHeaders.append('Content-Type', "application/json");
    customHeaders.append('Authorization', `Basic ${Base64.encode(`${apitoken}:"api_token"`)}`);
    customHeaders.append('apitoken', apitoken);



    try{
        //const authResponse = await fetch('http://localhost:'+SERVER_PORT+'/api/toggl-auth',  { headers : customHeaders } );
        const authResponse = await fetch('https://incidental-fox-productivity.netlify.app/.netlify/functions/togglServer/toggl-auth/',  { headers : customHeaders } );
        //const authResponse = await fetch('https://api.track.toggl.com/api/v9/me',  {method:"GET", headers : customHeaders } );
        const authData = await authResponse.json();
        console.log('Auth Data:', authData);
        togglWorkspaceId.set(authData.default_workspace_id);

    } catch (error) {
        console.error(error);
        // Handle the error
      }

}

// Fetch Toggl data from the Express API
async function fetchTogglProjects(apitoken:string, workspaceid:string) {

try {

    let customHeaders = new Headers()
    customHeaders.append('apitoken', apitoken);
    customHeaders.append('workspaceid', workspaceid);
    //const dataResponse = await fetch('http://localhost:'+SERVER_PORT+'/api/toggl/projects', { headers : customHeaders });
    const dataResponse = await fetch('https://incidental-fox-productivity.netlify.app/.netlify/functions/togglServer/toggl-auth/toggl/projects', { headers : customHeaders });
    
    const data = await dataResponse.json();
    console.log('Response Text:', data);

    togglProjects.set(data);
  } catch (error) {
    console.error(error);
    // Handle the erro
  }
}

// Export the store and the fetch function
export { togglProjects, togglWorkspaceId, fetchTogglProjects, getTogglWorkspace};
