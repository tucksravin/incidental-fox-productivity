# incidental fox productivity

Digitizing my productivity system, integrating the toggl and todoist apis

## Developing

dev server

```bash
npm run dev
```

compile ts changes to js in toggl server for netlify functions

```bash
npm run build:functions

```

## Next To Dos

### mvp

scaffold and implement all database functions in function folder
layout habit tracker/theme page (2 week sections) [no data]
set up the journal page / dashboard [no data]
add the theme / schedule / journal links to nav with relevant animations (break into daily, fortnightly, quarterly, and yearly pages)
build the journal, theme, habit data structure for firebase
build stores and functions to access then tie into layout
add a conditional today button
add links to toggl and todoist in top corners
reactive title

### fixes for later

sort task boxes
sort entry boxes
fix stacking of todoist time chunks
find a real solution for having the projects refresh only after the user auth has loaded in instead of just a timeout
make everything faster, fetch data only when needed everything else should be firebase/store based
convert all dates to luxon datetimes
see why todoist sometimes has cors problems and sometimes doesn't
make animations to mask unvoidable loads and slowdowns
unify all fetch method syntax
make nav for all options
maybe delay the slide in a touch so everything is generally already loaded in
let chunks know if they're a todoist chunk or toggl chunk
fix lag on update for times and all other methods, can probably manually update the store in the dom without pinging server if I give all the todoist methods access to the stores
dynamically limit what times you can set
fetch console error


### features for later

method to add a task
full edit box for tasks
hide/customize scrollbars
add animations and transtions within pages
have time input check if there's overlap
set up the full width versions of the toggl v todoist view
responsive designs
drag n drop and resize on time bars
animate the time bars
logo design
add more developed auth rules for firebase (fireship course)
calendar view
build a custom datepicker
move todoist api to express server if it remains inconsistent
add check if internet goes out while someone is browsing
get completed todoist tasks for going back and include checkmarks (might need to convert to sync api)

### features for much later

make my own time entering ui (or this? <https://codesandbox.io/s/condescending-colden-7gjkp?file=/App.svelte> or <https://fengyuanchen.github.io/pickerjs/> )
turn the time bars into circles like the journal
graphic design on tasks and time entries to float based on when they're on the schedule
customize colors and projects
customize time span covered (probably just forward and back)
deeper reports in a calendar view
follow specific tasks, build trends
