<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import DelayContent from "$lib/components/DelayContent.svelte";
    import { db, user, userData } from "$lib/stores/firebaseStore";
    import { doc, getDoc, writeBatch } from "firebase/firestore"
    import { fade } from "svelte/transition"
    import { TodoistApi } from '@doist/todoist-api-typescript'
    import { getTogglWorkspace, togglWorkspaceId } from "$lib/stores/togglStore";
  
   

    //regex to force alphanumeric options
    const alphaNumRegex = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    let username = "";
    let loadingusernameCheck = false;
    let isAvailable = false;
    let usernameChecked = false;

    let toggltoken = "";
    let loadingTogglCheck = false;
    let isTogglTokenValid = false;
    let togglChecked = false
  
    let todotoken = "";
    let loadingTodoistCheck = false;
    let isTodoistTokenValid = false;
    let todoistChecked = false;

    let debounceTimer: NodeJS.Timeout;

    async function checkusernameAvailability(){
        isAvailable = false;
        loadingusernameCheck = true;
        
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout( async () => {
            
        console.log("checking avail of ", username);

        const ref = doc(db, "handles", username);
        const exists = await getDoc(ref).then( (doc) => doc.exists() );

        const isValid = username.length > 2 && username.length < 16 && alphaNumRegex.test(username);

        isAvailable = !exists && isValid;
        loadingusernameCheck = false;

        }, 750);

        usernameChecked = username.length>0;
       
    }


    
    async function checkTogglToken(){
        isTogglTokenValid = false;
        loadingTogglCheck = true;

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout( async () => {
            
            console.log("checking toggl token ", toggltoken);
            
            isTogglTokenValid = false;

            await getTogglWorkspace(toggltoken);
            if(JSON.stringify($togglWorkspaceId)!=="{}"&&$togglWorkspaceId!=null)
                isTogglTokenValid = true;
            else
            isTogglTokenValid = false;

            loadingTogglCheck = false;
        
            }, 750);
            
            
        togglChecked = toggltoken.length>0;
        


    }

    
    async function checkTodoistToken(){
        isTodoistTokenValid = false;
        loadingTodoistCheck = true;

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout( async () => {
            
            console.log("checking todoist token ", todotoken);
                    
            isTodoistTokenValid = false;

            const todoistApi = new TodoistApi(todotoken);
            todoistApi.getProjects().then((projects) => { 
                isTodoistTokenValid = projects.length>0
                loadingTodoistCheck = false;
            }).catch((error) => {
                console.log(error)
                isTodoistTokenValid=false;
                loadingTodoistCheck=false;
            })
            }, 750);
    
            
        todoistChecked = todotoken.length>0;
         


    }

    async function createUserAccount(){

        console.log("creating acct for: ", username)

        const togglworkspaceid = $togglWorkspaceId;
        const batch = writeBatch(db);
        batch.set(doc(db, "handles", username), { uid: $user?.uid })
        batch.set(doc(db, "users", $user!.uid),{
            username,
            toggltoken,
            togglworkspaceid,
            todotoken
        })

    await batch.commit();
    username = '';
    isAvailable = false;
    usernameChecked = false;
    toggltoken='';
    isTogglTokenValid = false;
    togglChecked = false;
    todotoken = '';
    isTodoistTokenValid = false;
    todoistChecked = false;
    }


</script>
<DelayContent>
<AuthCheck>


{#if $userData?.username}
    <h2 class="font-bold mx-16">hi, looks like you've been here before!</h2>
    <h2 class="font-bold mx-16">head over to your dashboard!</h2>
    <a class="btn mt-8" href="/{$userData.username}">{$userData.username}</a>

{:else }
    <h2 class="font-bold mx-16">hi, looks like it's your first time signing in</h2>



    <form class=" h-2/3 w-3/4 mt-8 flex-vertical justify-start align-top" on:submit|preventDefault={createUserAccount}>
        <div class="form-control">
      
            <label for="usernameInput" class="label">
                <div class="tooltip" data-tip="only numbers and letters please!">
                    <span class="label-text-alt">so we can get you a unique url</span>
                </div>
            </label>
                <input
                    id="usernameInput"
                    type="text"
                    placeholder="username"
                    class="input mb-4 w-96 max-w-full"
                    class:input-warning={loadingusernameCheck&&usernameChecked}
                    class:input-success={isAvailable&&usernameChecked}
                    class:input-error={!isAvailable&&usernameChecked&&!loadingusernameCheck}
                    bind:value={username}
                    on:input={checkusernameAvailability}
                />
            
    
        <div class="h-10 w-96 max-w-full">
        
            {#if isAvailable && usernameChecked && !loadingusernameCheck}
                <p class="text-success-content mb-2 text-left"> a name that's all your own! </p>
            {/if}

            {#if !isAvailable && usernameChecked &&!loadingusernameCheck}
                <p class="text-warning-content mb-2 text-left"> sorry, that username isn't available </p>
            {/if}

            {#if loadingusernameCheck && usernameChecked}
                
                    <div class="loading loading-spinner loading-m text-warning"></div>
                
            {/if}
        </div>

        </div>

        <!--toggl input-->

        <div class="form-control">
      
            <label for="togglInput" class="label">
                <div class="tooltip" data-tip="copy paste is your friend here">
                    <span class="label-text-alt">to get your times</span>
                </div>
            </label>
                <input
                    id="togglInput"
                    type="text"
                    placeholder="toggl api token"
                    class="input mb-4 w-96 max-w-full"
                    class:input-warning={loadingTogglCheck&&togglChecked}
                    class:input-success={isTogglTokenValid&&togglChecked}
                    class:input-error={!isTogglTokenValid&&togglChecked&&!loadingTogglCheck}
                    bind:value={toggltoken}
                    on:input={checkTogglToken}
                />
            
    

                <div class="h-10 w-96 max-w-full">
            {#if isTogglTokenValid && togglChecked && !loadingTogglCheck}
                <p class="text-success-content mb-2 h-10 text-left"> toggl seems to like this one, heck yea! </p>
            {/if}

            {#if !isTogglTokenValid && togglChecked &&!loadingTogglCheck}
                <p class="text-warning-content mb-2 h-10 text-left"> looks like an invalid token </p>
            {/if}

            {#if loadingTogglCheck && togglChecked}
                
                    <span class="loading loading-spinner loading-m text-warning"></span>
                
            {/if}
            </div>

        </div>

        <!--todoist input-->

        <div class="form-control">
      
            <label for="todoistInput" class="label">
                <div class="tooltip" data-tip="I won't steal your tasks I promise">
                    <span class="label-text-alt">to get your tasks</span>
                </div>
            </label>
                <input
                    id="todoistInput"
                    type="text"
                    placeholder="todoist api token"
                    class="input mb-4 w-96 max-w-full"
                    class:input-warning={loadingTodoistCheck&&todoistChecked}
                    class:input-success={isTodoistTokenValid&&todoistChecked}
                    class:input-error={!isTodoistTokenValid&&todoistChecked&&!loadingTodoistCheck}
                    bind:value={todotoken}
                    on:input={checkTodoistToken}
                />
            
    

            <div class="h-10 w-96 max-w-full">
                {#if isTodoistTokenValid && todoistChecked && !loadingTodoistCheck}
                    <p class="text-success-content mb-2 h-10 text-left"> we checked with todoist and this looks a-okay! </p>
                {/if}
                {#if !isTodoistTokenValid && todoistChecked &&!loadingTodoistCheck}
                    <p class="text-warning-content mb-2 h-10 text-left"> looks like an invalid token </p>
                {/if}
                {#if loadingTodoistCheck && todoistChecked}
                    <span class="loading loading-spinner loading-m text-warning"></span>
                {/if}
            </div>

        <div class="py-4 h-24">
         {#if (usernameChecked&&isAvailable&&todoistChecked&&isTodoistTokenValid&&isTogglTokenValid&&togglChecked)}
            <div class="flex align-items-end justify-between w-96 max-w-full">
            <h3 class="text-success-content my-4 font-semibold" in:fade>everything looks good!</h3>

            <button class="btn block my-4 group hover:btn-success" in:fade>
                <span>Submit</span>
                <span class="group-hover:hidden">?</span>
                <span class="hidden group-hover:inline">!</span>
            </button>

        </div>
       
           
        {/if}
        </div>

    </form>
    {/if}
</AuthCheck>
</DelayContent>
