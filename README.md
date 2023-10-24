# incidental fox productivity

Digitizing my productivity system, integrating the toggl and todoist apis

## Developing

```bash
npm run dev
```

## Next To Dos

### mvp

time entering pop-ups (use native input type=time), add other buttons
fix toggl ctx error
stop the timeline from lagging a page behind
stop project on task entries from also lagging a page behind
scaffold and implement all database functions in function folder
layout habit tracker/theme page (2 week sections) [no data]
set up the journal page [no data]
layout dashboard [ no data ]
add the theme / schedule / journal links to nav with relevant animations
build the journal, theme, habit data structure for firebase
build stores and functions to access then tie into layout

### fixes for later

sort task boxes
sort entry boxes
move arrows off of card to give timeline max space
find a real solution for having the projects refresh only after the user auth has loaded in instead of just a timeout
make everything faster, fetch data only when needed everything else should be firebase/store based
convert dates to luxon datetimes
see why todoist sometimes has cors problems and sometimes doesn't
make animations to mask unvoidable loads and slowdowns
get rid of unexpected width/height attr error from console
unify all fetch method syntax
get completed todoist tasks for going back and include checkmarks (might need to convert to sync api)
make nav for all options

### features for later

add animations and transtions within pages
have time input check if there's overlap
set up the full width versions of the toggl v todoist view
drag n drop and resize on time bars
animate the time bars
logo design
add more developed auth rules for firebase (fireship course)
calendar view
move todoist api to express server if it remains inconsistent
add check if internet goes out while someone is browsing

### features for much later

make my own time entering ui (or this? <https://codesandbox.io/s/condescending-colden-7gjkp?file=/App.svelte> or <https://fengyuanchen.github.io/pickerjs/> )
turn the time bars into circles like the journal
graphic design on tasks and time entries to float based on when they're on the schedule
customize colors and projects
customize time span covered (probably just forward and back)
deeper reports in a calendar view
follow specific tasks, build trends
