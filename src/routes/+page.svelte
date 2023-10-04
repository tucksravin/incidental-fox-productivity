<script lang='ts'>
  import { togglWorkspaceId, getTogglWorkspace, fetchTogglProjects, togglProjects } from '$lib/stores/togglStore';
  import { userData } from '$lib/firebase'

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