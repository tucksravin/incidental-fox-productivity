import { Base64 } from 'js-base64';
import { togglProjects, togglWorkspaceId, togglTimeEntries, togglLoading, togglTimeline } from './../stores/togglStore';
import type { FirebaseProject } from '$lib/types/firebase_types';
import type { TimeChunk } from '$lib/types/frontend_types';
import { firebaseProjects } from '../stores/firebaseStore';
import { timeEntryToTimeChunk } from './timelineFunctions';
import type { DateTime } from 'luxon';

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
        //console.log('Auth Data:', authData);
        togglWorkspaceId.set(authData.default_workspace_id);
        togglLoading.set(false);

    } catch (error) {
        console.error(error);
      }

    return togglWorkspaceId;

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
    //console.log('Response Text:', data);

    togglProjects.set(data);
    togglLoading.set(false);
  } catch (error) {
    console.error(error);
  }

  //console.log("entries fetched")
}

async function fetchDailyTimeEntries(apitoken:string, date:DateTime ) {
  togglLoading.set(true);

    try {
        let requested_date = date.toISO();
       // console.log(requested_date);

        let customHeaders = new Headers()
        customHeaders.append('apitoken', apitoken);
        customHeaders.append('requested_date', requested_date);
        //console.log(date.toISOString().slice(0,10));
        const dataResponse = await fetch('https://incidental-fox-productivity.netlify.app/.netlify/functions/togglServer/time-entries', { headers : customHeaders });
        
        const data = await dataResponse.json();
        //console.log('Response Text fetch time entries:', data);
    
        togglTimeEntries.set(data);
        setTogglTimeline();

        //console.log(togglTimeEntries);
        togglLoading.set(false);
      } catch (error) {
        console.error(error);
        togglLoading.set(false);
      }
}

export function setTogglTimeline(){
  let togglTimeChunks:TimeChunk[] = [];

  let entries;
  togglTimeEntries.subscribe((value) => { entries = value;});



  entries.forEach((entry)=> {
    togglTimeChunks.push(timeEntryToTimeChunk(entry))});

//console.log("toggl timeline set")

togglTimeline.set(togglTimeChunks);
}


function togglProjectIdToFirebaseProject(id:string) {  
  let allFirebaseProjects:FirebaseProject[];
  firebaseProjects.subscribe((value) => { allFirebaseProjects = value;});

  let currProject:FirebaseProject;

  //console.log("checking:");
  //console.log(parseInt(id))

  allFirebaseProjects.forEach((project) => { 

     if(parseInt(project.togglId) == parseInt(id)) currProject = project;
    });

    //console.log(currProject)


  return currProject;


}

//fetch specific time entry: takes api and time entry id as parameters, returns time entry

// Export the store and the fetch function
export { fetchTogglProjects, getTogglWorkspace, fetchDailyTimeEntries, togglProjectIdToFirebaseProject };
