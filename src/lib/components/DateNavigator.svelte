<script lang='ts'>
    //will fill in whatever container it is placed in

    import type { PageData } from "./../../routes/[username]/[month]-[day]-[year]/$types";
    import Icon from "@iconify/svelte"
    import { getCurrentPageDate } from "./../functions/navigationFunctions"
    import { DateTime } from 'luxon'

    export let data: PageData;

    let backButtonText = "previous day";
    let nextButtonText = "next day"
    const today = DateTime.now();
    const isToday = data.date.toLocaleString()==today.toLocaleString();

    if(isToday){
        backButtonText = "yesterday"
        nextButtonText = "tomorrow"
    }

    let nextDayUrl = "";
    let prevDayUrl = "";

    
    const nextDay = new Date();
    nextDay.setDate(getCurrentPageDate().getDate()+1);
    //console.log("next date: "+nextDay.toString())
    nextDayUrl = `/${data.username}/${nextDay.getMonth() + 1}-${nextDay.getDate()}-${nextDay.getFullYear()}?fromRight`;


    const prevDay = new Date()
    prevDay.setDate(getCurrentPageDate().getDate()-1)
    //console.log("prev date: "+prevDay.toString())
    prevDayUrl = `/${data.username}/${prevDay.getMonth() + 1}-${prevDay.getDate()}-${prevDay.getFullYear()}?fromLeft`;

</script>

<div class="w-[120%] flex justify-between align-middle -ml-[10%]">
    <a class="hover:opacity-80 cursor-pointer h-24 w-24 flex-col" href={prevDayUrl}>
        <Icon icon="tabler:arrow-badge-left" height="48" class="float-left -ml-2"/>
        <div class="float-left">{backButtonText}</div>     
    </a>

    <a class="hover:opacity-80 cursor-pointer h-24 w-24 flex-col" href={nextDayUrl}>
        <Icon icon="tabler:arrow-badge-right" height="48" class="float-right -mr-2"/>
        <div class="float-right">{nextButtonText}</div>     
    </a>
</div>