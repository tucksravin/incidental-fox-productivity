<script lang='ts'>
    //will fill in whatever container it is placed in

    import type { PageData } from "./../../routes/[username]/[month]-[day]-[year]/$types";
    import Icon from "@iconify/svelte"
    import { getCurrentPageDate } from "./../functions/navigationFunctions"

    export let data: PageData;

    let backButtonText = "previous day";
    let nextButtonText = "next day"
    const today = new Date();
    const isToday = data.date.toDateString()==today.toDateString();

    if(isToday){
        backButtonText = "yesterday"
        nextButtonText = "tomorrow"
    }

    let nextDayUrl = "";
    let prevDayUrl = "";

    
    const nextDay = new Date();
    nextDay.setDate(getCurrentPageDate().getDate()+1);
    console.log("next date: "+nextDay.toString())
    nextDayUrl = `/${data.username}/${nextDay.getMonth() + 1}-${nextDay.getDate()}-${nextDay.getFullYear()}?fromRight`;


    const prevDay = new Date()
    prevDay.setDate(getCurrentPageDate().getDate()-1)
    console.log("prev date: "+prevDay.toString())
    prevDayUrl = `/${data.username}/${prevDay.getMonth() + 1}-${prevDay.getDate()}-${prevDay.getFullYear()}?fromLeft`;
    
    //TODO: fix weird behaviors on setting links, seems to have a weird loop confined to a week?

</script>

<div class="w-full h-full flex justify-between align-middle">
    <a class="hover:opacity-80 cursor-pointer" href={prevDayUrl}>
        <Icon icon="tabler:arrow-badge-left" inline={true} height="4rem" width="4rem"/>
        <div>{backButtonText}</div>     
    </a>

    <a class="hover:opacity-80 cursor-pointer" href={nextDayUrl}>
        <Icon icon="tabler:arrow-badge-right" inline={true} height="4rem" width="4rem"/>
        <div>{nextButtonText}</div>     
    </a>
</div>