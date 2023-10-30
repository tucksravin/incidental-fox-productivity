<script lang='ts'>
    //will fill in whatever container it is placed in


    import Icon from "@iconify/svelte"
    import { getCurrentPageDate } from "./../functions/navigationFunctions"
    import { DateTime } from 'luxon'

    export let data;

    let backButtonText = "previous";
    let nextButtonText = "next"
    const today = DateTime.now();
 

    let nextUrl = "";
    let prevUrl = "";

    if(data?.month){
    
        backButtonText = backButtonText + " day"
        nextButtonText = nextButtonText + " day"


        if(data?.date.toLocaleString()==today.toLocaleString()){
            backButtonText = "yesterday"
            nextButtonText = "tomorrow"
        }
    
        

    
    const nextDay = getCurrentPageDate().plus({days:1})

    //console.log("next date: "+nextDay.toString())
    nextUrl = `/${data.username}/daily/${nextDay.month}-${nextDay.day}-${nextDay.year}?fromRight`;


    const prevDay = getCurrentPageDate().minus({days:1})
    //console.log("prev date: "+prevDay.toString())
    prevUrl = `/${data.username}/daily/${prevDay.month}-${prevDay.day}-${prevDay.year}?fromLeft`;

    }

    if(data.fortnight){

        backButtonText = backButtonText + " fortnight"
        nextButtonText = nextButtonText + " fortnight"

        nextUrl = `/${data.username}/fortnightly/${data.fortnight+1}-${data.year}?fromRight`;
        prevUrl = `/${data.username}/fortnightly/${data.fortnight-1}-${data.year}?fromLeft`;

        if(data.fortnight==26)
            nextUrl = `/${data.username}/fortnightly/1-${data.year+1}?fromRight`;

        if(data.fortnight==1)
            prevUrl = `/${data.username}/fortnightly/26-${data.year-1}?fromLeft`;

    }

</script>

<div class="w-[120%] flex justify-between align-middle -ml-[10%]">
    <a class="hover:opacity-80 cursor-pointer h-24 w-24 flex-col transition-opacity" href={prevUrl}>
        <Icon icon="tabler:arrow-badge-left" height="48" class="float-left -ml-2"/>
        <div class="float-left">{backButtonText}</div>     
    </a>

    <a class="hover:opacity-80 cursor-pointer h-24 w-24 flex-col transition-opacity" href={nextUrl}>
        <Icon icon="tabler:arrow-badge-right" height="48" class="float-right -mr-2"/>
        <div class="float-right">{nextButtonText}</div>     
    </a>
</div>