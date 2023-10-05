<script lang='ts'>
    //will fill in whatever container it is placed in

    import type { PageData } from "./../../routes/[username]/[month]-[day]-[year]/$types";
    import Icon from "@iconify/svelte"

    export let data: PageData;

    let backButtonText = "previous day";
    let nextButtonText = "next day"
    const today = new Date();
    const isToday = data.date.toDateString()==today.toDateString();
    if(isToday){
        backButtonText = "yesterday"
        nextButtonText = "tomorrow"
    }

    const nextDay = new Date()
    nextDay.setDate(data.date.getDate()+1);
    const nextDayUrl = "/"+data.username+"/"+(nextDay.getMonth()+1)+"-"+(nextDay.getDay()+1)+"-"+nextDay.getFullYear()+"/?fromRight";

    const prevDay = new Date()
    prevDay.setDate(data.date.getDate()-1)
    const prevDayUrl = "/"+data.username+"/"+(prevDay.getMonth()+1)+"-"+(prevDay.getDay()+1)+"-"+prevDay.getFullYear()+"/?fromLeft";

    //TODO: Add date picker
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