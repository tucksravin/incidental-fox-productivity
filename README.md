# incidental fox productivity

Digitizing my productivity system, integrating the toggl and todoist apis

## Developing

```bash
npm run dev
```

## Next To Dos

### mvp

catch times that flip over to the next day UTC (for pt, anything after 5pm)
use todos to fill in the left side of the timeline with time chunks
build interface to add times and durations to todoist tasks so they can fill the left side
scaffold and implement all database functions in function folder
layout habit tracker/theme page (2 week sections) [no data]
set up the journal page [no data]
layout dashboard [ no data ]
add the theme / schedule / journal links to nav with relevant animations
build the journal, theme, habit data structure for firebase
build stores and functions to access then tie into layout

### fixes for later

find a real solution for having the projects refresh only after the user auth has loaded in instead of just a timeout
make everything faster, fetch data only when needed everything else should be firebase/store based
convert dates to luxon datetimes
see why todoist sometimes has cors problems and sometimes doesn't
make animations to mask unvoidable loads and slowdowns

### features for later

set up the full width versions of the toggl v todoist view
drag n drop and resize on time bars
graphic design on tasks and time entries to float based on when they're on the schedule
animate the time bars
logo design
add more developed auth rules for firebase (fireship course)
move todoist api to express server if it remains inconsistent

### features for much later

turn the time bars into circles like the journal
customize colors and projects
customize time span covered (probably just forward and back)
deeper reports in a calendar view
follow specific tasks, build trends
