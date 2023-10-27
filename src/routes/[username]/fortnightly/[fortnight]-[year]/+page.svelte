<script lang="ts">
    import { DateTime } from 'luxon'
    import { firebaseProjects, user, userData } from '$lib/stores/firebaseStore'
    import { fetchDailyTimeEntries } from '$lib/functions/togglFunctions.js';
    import { refreshProjects } from '$lib/functions/firebaseFunctions.js';
    import { fetchTodoistTasks } from '$lib/functions/todoistFunctions.js';
    import { onMount } from "svelte"
    
    export let data;
  
    const fortnightStartDate = DateTime.local(data.year).plus({weeks:(data.fortnight-1)*2});
    let dates:DateTime[]=[];
    let habits:string[] = [];
    $firebaseProjects;
    $user;


    if($firebaseProjects.length==0){
      onMount(()=>{
        setTimeout(()=>{
          refreshProjects($user);
        }, 1)   
        //console.log($togglProjects)     
      })
    }
//tie timeline update to this and proj refresh
    fetchTodoistTasks($userData.todotoken, DateTime.now());
    fetchDailyTimeEntries($userData.toggltoken, DateTime.now());
 
    for(let i = 0 ; i<14 ; i++)
        dates.push(fortnightStartDate.plus({days:i}));
        let sevenRandomBools = ():boolean[] => {
        let out = []
        for(let i = 0 ; i<7 ; i++)
            out.push(Math.random()<0.5);
            return out;
        }


    
    habits = ['practice','sleep','cook', 'sportz', 'develop', 'watch', 'read'];

    const getHabitTextColorCSS = (habit:string) => {
        let color = "#475569";
        //console.log(habit);
        //console.log($firebaseProjects)

        $firebaseProjects.forEach(project => {
            if(project.name==habit)
                color=project.color;
        });

        return "color:"+color;
    }

</script>



<div class="flex flex-row w-full h-full">
    <div class=" flex flex-col justify-between w-1/3 border-r-slate-400 border-r-2">
        <h2>{fortnightStartDate.toLocaleString({ month: 'long', day: 'numeric' })} to {fortnightStartDate.plus({weeks:2, days:-1}).toLocaleString({ month: 'long', day: 'numeric' })}, {data.year}</h2>
        <h1 class="text-slate-600 text-xl font font-semibold p-4">Theme goes here</h1>
        <h1 class="text-slate-600 text-xl font font-semibold p-4">Goal goes here</h1>
        <div> add some stuff for the current day </div>
    </div>
    <div class="w-2/3 h-full flex flex-col align-middle justify-center">
        <div class="w-full h-1/6 flex flex-row">
            <div class="w-1/6 h-full"></div>
            <div class="w-5/6 h-full flex flex-col border-b border-slate-400">
                <div class="h-1/3 w-full"></div>
                <div class="h-2/3 w-full flex flex-row">
                    {#key $firebaseProjects}
                    {#each habits as habit}
                        <div class="-rotate-45 h-full w-9 border-l mr-8 -ml-8 border-slate-400 " >
                            <div class="rotate-90 text-slate-600 text-xs -translate-x-1 translate-y-6" style={getHabitTextColorCSS(habit)}>{habit}</div>
                        </div>
                    {/each}
                    {/key}
                </div>
            </div>
        </div>
        
        <div class="w-full h-5/6 flex flex-row">
            <div class="w-1/6 h-full flex flex-col content-end">
                {#each dates as date}
                <div class="md:ml-[33.33333%] md:w-2/3 h-9 p-4 pr-6 border border-t-0 border-l-0 border-slate-400 text-slate-600 text-xs whitespace-nowrap">{date.toLocaleString({ month: 'short', day: 'numeric' })}</div>
                {/each}
            </div>
            <div class="w-5/6 h-full flex flex-col">
                {#each dates as date}
                <div class="h-9 w-full flex flex-row border-b">
                    {#each sevenRandomBools() as bool}
                        <div class="h-full w-9 border-r rounded-sm" class:bg-red-800={!bool} class:bg-green-800={bool}></div>
                    {/each}
                </div>
                {/each}
            </div>
        </div>
    </div>
</div>
