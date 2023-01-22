import { useEffect, useState } from "react";
import {  getShortDate } from "../helpers/dateHelpers";

type BlockProps = {
    data: any
    day: number
}

function Block(props: BlockProps) {

    const baseImageUrl = "http://openweathermap.org/img/wn/"

    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        if (props.data.daily) {
            const dayData: any = props.data.daily[props.day]
            setTemp(Math.trunc(dayData.temp.day))
            setDescription(dayData.weather[0].main)
            setImageUrl(baseImageUrl + dayData.weather[0].icon + "@2x.png")

            const fullDate = getShortDate(dayData.dt)
            setDate(fullDate)


        }
    }, [props.data.daily, props.day])

    return (
        <div className="Block">
            <div className="blockContent">
                <div className="blockCol1">
                    <div className="blockHeading">
                        <h3>{date}</h3>
                    </div>
                    <div className="blockImage">
                        <img src={imageUrl}></img>
                    </div>
                </div>
                <div className="blockCol2">
                    <div className="blockTemp">
                        <p className="description">{temp} °C</p>
                        <p className="description">{description}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Block