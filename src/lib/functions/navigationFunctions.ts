

export const getCurrentPageDate = () => {
    const date = new Date();
    let url = window.location.href;
    let dateString  = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('?'));
    if (url.lastIndexOf('?')<0) 
        dateString = url.slice(url.lastIndexOf('/') + 1)

    let month = dateString.slice(0, dateString.indexOf('-'))
    let day = dateString.slice(dateString.indexOf('-') + 1, dateString.lastIndexOf('-'))
    let year = dateString.slice(dateString.lastIndexOf('-') + 1)

    date.setDate(parseInt(day))
    date.setMonth(parseInt(month) - 1)
    //set year?


    console.log(date.toString());
    return date;
};
