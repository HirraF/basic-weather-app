
export const getDateParts = (date_unix: number) : string[]  => {
    // return dayWord, month, day
    const date = new Date(date_unix*1000).toDateString()
    return date.split(' ')

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