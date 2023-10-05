import { writable } from 'svelte/store';
import { Base64 } from 'js-base64';

//TODO: add a store that relates propject ids to project title and color and relates to firebase groundtruth.




// Initialize the store with an empty object
const togglProjects = writable<any>({});
const togglWorkspaceId =  writable<any>({});
const togglTimeEntries = writable<any[]>([{}]);
const togglLoading = writable<boolean>(false);

async function getTogglWorkspace(apitoken:string ) {

    togglLoading.set(true);
    
    let customHeaders = new Headers()
    customHeaders.append('Content-Type', "application/json");
    customHeaders.append('Authorization', `Basic ${Base64.encode(`${apitoken}:"api_token"`)}`);
    customHeaders.append('apitoken', apitoken);



    try{
        const authResponse = await fetch('https://incidental-fox-productivity.netlify.app/.netlify/functions/togglServer/auth/',  { headers : customHeaders } );
        const authData = await authResponse.json();
        console.log('Auth Data:', authData);
        togglWorkspaceId.set(authData.default_workspace_id);
        togglLoading.set(false);

    } catch (error) {
        console.error(error);
      }

}

// Fetch Toggl data from the Express API
async function fetchTogglProjects(apitoken:string, workspaceid:string) {

  togglLoading.set(true);

try {

    let customHeaders = new Headers()
    customHeaders.append('apitoken', apitoken);
    customHeaders.append('workspaceid', workspaceid);
    const dataResponse = await fetch('https://incidental-fox-productivity.netlify.app/.netlify/functions/togglServer/projects', { headers : customHeaders });
    
    const data = await dataResponse.json();
    console.log('Response Text:', data);

    togglProjects.set(data);
    togglLoading.set(false);
  } catch (error) {
    console.error(error);
  }
}

async function fetchDailyTimeEntries(apitoken:string, date:Date ) {
  togglLoading.set(true);

    try {

        let customHeaders = new Headers()
        customHeaders.append('apitoken', apitoken);
        customHeaders.append('date', date.toISOString().slice(0,10));
        const dataResponse = await fetch('https://incidental-fox-productivity.netlify.app/.netlify/functions/togglServer/time-entries', { headers : customHeaders });
        
        const data = await dataResponse.json();
        console.log('Response Text:', data);
    
        togglTimeEntries.set(data);
        togglLoading.set(false);
      } catch (error) {
        console.error(error);
        togglLoading.set(false);
      }
}

// Export the store and the fetch function
export { togglProjects, togglWorkspaceId, fetchTogglProjects, getTogglWorkspace, fetchDailyTimeEntries, togglTimeEntries, togglLoading};
