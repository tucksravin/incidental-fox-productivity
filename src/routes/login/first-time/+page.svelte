<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db, user, userData } from "$lib/firebase";
    import { doc, getDoc, writeBatch } from "firebase/firestore"

    //regex to force alphanumeric options
    const alphaNumRegex = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    let username = "";
    let toggltoken = "";
    let todotoken = "";
    let loadingusernameCheck = false;
    let isAvailable = false;
    let usernameChecked = false;

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

        if(username.length>0){
            usernameChecked = true;
        } else{
            usernameChecked = false;
        }  
    }

    async function checkTogglToken(){

    }

    async function checkTodoistToken(){

    }

    async function createUserAccount(){

        console.log("creating acct for: ", username)
        const batch = writeBatch(db);
        batch.set(doc(db, "handles", username), { uid: $user?.uid })
        batch.set(doc(db, "users", $user!.uid),{
            username,
            toggltoken,
            todotoken
        })

    await batch.commit();
    username = '';
    isAvailable = false;
    usernameChecked = false;
    }


</script>

<AuthCheck>


{#if $userData.username}
    <h2 class="font-bold mx-16">hi, looks like you've been here before!</h2>
    <h2 class="font-bold mx-16">head over to your dashboard!</h2>
    <a class="btn" href="/{$userData.username}">{$userData.username}</a>

{:else }
    <h2 class="font-bold mx-16">hi, looks like it's your first time signing in</h2>



    <form class=" h-2/3 mt-8 flex-vertical justify-start" on:submit|preventDefault={createUserAccount}>
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
                    class="input mb-4"
                    class:input-warning={loadingusernameCheck&&usernameChecked}
                    class:input-success={isAvailable&&usernameChecked}
                    class:input-error={!isAvailable&&usernameChecked&&!loadingusernameCheck}
                    bind:value={username}
                    on:input={checkusernameAvailability}
                />
            
    

   
            {#if isAvailable && usernameChecked && !loadingusernameCheck}
                <p class="text-success-content mb-2 h-10"> a name that's all your own! </p>
            {/if}

            {#if !isAvailable && usernameChecked &&!loadingusernameCheck}
                <p class="text-warning-content mb-2 h-10"> sorry, that username isn't available </p>
            {/if}

            {#if loadingusernameCheck && usernameChecked}
                <div class="h-10">
                    <span class="loading loading-spinner loading-xs text-warning"></span>
                </div>
            {/if}

        </div>
        
        <div>
        <input
            type="text"
            placeholder="toggl token"
            class="m-4 input"
            bind:value={toggltoken}
            on:input={checkTogglToken}
        />
        </div>

        <div>
            <input
                type="text"
                placeholder="todoist token"
                class="m-4 input-secondary input"
                bind:value={todotoken}
                on:input={checkTodoistToken}
            />
        </div>


        {#if usernameChecked&&isAvailable}
        <div class="mt-16">
            <h3 class="text-success-content block text-left">everything looks good!</h3>

            <button class="btn block mt-4 group hover:btn-success" >
                <span>Submit</span>
                <span class="group-hover:hidden">?</span>
                <span class="hidden group-hover:inline">!</span>
            </button>
        </div>
           
        {/if}

    </form>
    {/if}
</AuthCheck>


