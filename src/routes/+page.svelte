<script lang='ts'>
  import { togglWorkspaceId, getTogglWorkspace, fetchTogglProjects, togglProjects } from '$lib/stores/togglStore';

  $togglProjects;
  $togglWorkspaceId;

  function fireWorkspace(){
    getTogglWorkspace('eb5f0f751ab4079e0f7de08feab2d2a8')
  }

</script>

<button class="btn mt-16" on:click={fireWorkspace}>Fetch Toggl Workspace</button>
  
 <p>{JSON.stringify($togglWorkspaceId)!=="{}"&&$togglWorkspaceId!=null}</p>

<button class="btn mt-16" on:click={fetchTogglProjects}>Fetch Toggl Projects</button>

<p>{JSON.stringify($togglProjects)!=="{}"&&$togglProjects!=null}</p>