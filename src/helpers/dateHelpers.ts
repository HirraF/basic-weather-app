
export const getShortDate = (date_unix: number) : string  => {
    // return dayWord, month, day
    const date = new Date(date_unix*1000).toDateString()
    const options : Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const fullDate = new Date(date_unix*1000).toLocaleDateString("en-GB", options)
    return fullDate

}

export const getDayEnding = (day:string) : string => {
    const dayAsNumber = Number(day)
    if(dayAsNumber === 1){
        return('st')
    }
    if(day.slice(-1) === '2' && dayAsNumber !== 12){
        return('nd')
    }
    if(day.slice(-1) === '3' && dayAsNumber !== 13){
        return('rd')
    }
    return('th')
} 

export const getFullDate = (date_unix: number):string => {
    const options : Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fullDate = new Date(date_unix*1000).toLocaleDateString("en-GB", options)
    return fullDate
}