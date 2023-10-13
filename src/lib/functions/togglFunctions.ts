import { writable } from 'svelte/store';
import { Base64 } from 'js-base64';
import { togglProjects, togglWorkspaceId, togglTimeEntries, togglLoading } from './../stores/togglStore';
import { refreshProjects } from './firebaseFunctions';
import { prodErrorMap } from 'firebase/auth';



//TODO: move functions from here to togglfunctions



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
        let requested_date = date.toISOString().slice(0,10);

        let customHeaders = new Headers()
        customHeaders.append('apitoken', apitoken);
        customHeaders.append('requested_date', requested_date);
        console.log(date.toISOString().slice(0,10));
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


function togglProjectIdToName (id:string) {  
  let name ="";
  let projects:[any];
  togglProjects.subscribe((value) => { 
    if(Array.isArray(value) == false){
      try{
        refreshProjects()
      }
      catch(error){console.log(error)
    }
  }
});
  togglProjects.subscribe((value) => { projects = value;});
   

     projects.forEach((project) => { if(project.id == id) name = project.name;

     });
  
  return name;

}

//fetch specific time entry: takes api and time entry id as parameters, returns time entry

// Export the store and the fetch function
export { fetchTogglProjects, getTogglWorkspace, fetchDailyTimeEntries, togglProjectIdToName };
