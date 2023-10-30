//switch to DateTime for consistency
import { DateTime } from 'luxon'

export const getCurrentPageDate = ():DateTime => {
    let url = window.location.href;
    let dateString  = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('?'));
    if (url.lastIndexOf('?')<0) 
        dateString = url.slice(url.lastIndexOf('/') + 1)

    let month = dateString.slice(0, dateString.indexOf('-'))
    let day = dateString.slice(dateString.indexOf('-') + 1, dateString.lastIndexOf('-'))
    let year = dateString.slice(dateString.lastIndexOf('-') + 1)

    let date = DateTime.local(parseInt(year), parseInt(month), parseInt(day))

    //console.log(date.toString());
    return date;
};

export const getUrlStringFromDate = (date:DateTime) => `/${date.month}-${date.day}-${date.year}`;



export const getFortnightNumber = (date:DateTime) => {
    for(let i = 26 ; i>-1 ; i--){
        if(date.minus({weeks:i*2}).year==date.year)
            return i+1;
    }
    return -1;
}
