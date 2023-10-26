<script lang='ts'>
  import type { TimeChunk } from "$lib/types/frontend_types";
  import { removeTimesFromTask } from "$lib/functions/todoistFunctions";
  import { userData, user } from "$lib/stores/firebaseStore";
  import { refreshProjects } from "$lib/functions/firebaseFunctions";
  import { getCurrentPageDate } from "$lib/functions/navigationFunctions";
  
  


  
   export let timeChunks:TimeChunk[] = [];

   function chunksByStart(a:TimeChunk, b:TimeChunk){
    if(a.start<b.start)
        return 1;

    if(a.start>b.start)
        return -1;

        return 0;

   }

   //puts earlier chunks on top of later chunks 
   timeChunks.sort(chunksByStart)
  
  </script>
  
<div class="w-full h-full relative rounded-full overflow-hidden border-slate-600 border-2 bg-slate-400">
    {#each timeChunks as chunk, id (chunk.id+chunk.start)}
        <!--white backing element so hover doesn't show overlap with otther entries-->
        <div 
            class= "w-full absolute rounded-full"
            style= "
                height: {((chunk.end-chunk.start+2.1)*2)}%;
                background-color: white;
                top: {(chunk.start-2)*2}%;
                z-index: {54-chunk.start}
                "
            >
        </div>

        <div 
            class= "w-full absolute rounded-full hover:opacity-70 cursor-pointer"
            data-tip="{chunk.name}, {chunk.project}"
            style= "
                height: {((chunk.end-chunk.start+2.1)*2)}%;
                background-color: {chunk.color};
                top: {(chunk.start-2)*2}%;
                z-index: {55-chunk.start}
                "
            on:click={()=>{
                removeTimesFromTask($userData.todotoken, chunk.id, getCurrentPageDate());
                console.log("clicked "+chunk.id)
                refreshProjects($user);
                }}
            aria-hidden
            >
        </div>
        
    {/each}
</div>