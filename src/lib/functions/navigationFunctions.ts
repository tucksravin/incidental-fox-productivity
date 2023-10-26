//switch to DateTime for consistency
import { DateTime } from 'luxon'

export const getCurrentPageDate = () => {
    let url = window.location.href;
    let dateString  = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('?'));
    if (url.lastIndexOf('?')<0) 
        dateString = url.slice(url.lastIndexOf('/') + 1)

    let month = dateString.slice(0, dateString.indexOf('-'))
    let day = dateString.slice(dateString.indexOf('-') + 1, dateString.lastIndexOf('-'))
    let year = dateString.slice(dateString.lastIndexOf('-') + 1)

    let date = DateTime.local(parseInt(year), parseInt(month), parseInt(day))

    console.log(date.toString());
    return date;
};
