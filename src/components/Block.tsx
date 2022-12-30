import { useEffect, useState } from "react";
import  {getDateParts, getDayEnding } from "../helpers/dateHelpers";

type BlockProps = {
    data: any
    day : number
}

function Block(props:BlockProps){

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=53.4808&lon=2.2426&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_APP_KEY}&units=metric`
    const baseImageUrl = "http://openweathermap.org/img/wn/"

    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState('')
    const [date , setDate] = useState('')
    const [dateEnding, setDateEnding] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        if(props.data.daily){
        const dayData: any = props.data.daily[props.day]
        setTemp(dayData.temp.day)
        setDescription(dayData.weather[0].main)
        setImageUrl(baseImageUrl + dayData.weather[0].icon + ".png")
        
        const [dayWord, month, day]  = getDateParts(dayData.dt)
        
        const dateString = dayWord + ' ' + day
        setDate(dateString)

        setDateEnding(getDayEnding(day))

        } 
    })

    return (
       <div className="Block">
        <h2>{date}<sup>{dateEnding}</sup></h2>
        <img src={imageUrl}></img>
        <p>{description}</p>
        <p>{temp} °C</p>
        </div>
    );
}

export default Block