<script lang='ts'>
  import { togglWorkspaceId, togglProjects } from '$lib/stores/togglStore';
  import { getTogglWorkspace, fetchTogglProjects } from '$lib/functions/togglFunctions';
  import { userData } from '$lib/stores/firebaseStore'

  $togglProjects;
  $togglWorkspaceId;

  function fireWorkspace(){
    getTogglWorkspace($userData.toggltoken)
  }

  function fireProjects(){
    fetchTogglProjects($userData.toggltoken, $userData.togglworkspaceid);
  }

</script>

<button class="btn mt-16" on:click={fireWorkspace}>Fetch Toggl Workspace</button>
  
 <p>{JSON.stringify($togglWorkspaceId)!=="{}"&&$togglWorkspaceId!=null}</p>

<button class="btn mt-16" on:click={fireProjects}>Fetch Toggl Projects</button>

<p>{JSON.stringify($togglProjects)!=="{}"&&$togglProjects!=null}</p>