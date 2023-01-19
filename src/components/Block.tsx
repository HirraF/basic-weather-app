import { useEffect, useState } from "react";
import { getDateParts, getDayEnding } from "../helpers/dateHelpers";

type BlockProps = {
    data: any
    day: number
}

function Block(props: BlockProps) {

    const baseImageUrl = "http://openweathermap.org/img/wn/"

    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [dateEnding, setDateEnding] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        if (props.data.daily) {
            const dayData: any = props.data.daily[props.day]
            setTemp(Math.trunc(dayData.temp.day))
            setDescription(dayData.weather[0].main)
            setImageUrl(baseImageUrl + dayData.weather[0].icon + "@2x.png")

            const [dayWord, month, day] = getDateParts(dayData.dt)

            const dateString = dayWord + ' ' + day
            setDate(dateString)

            setDateEnding(getDayEnding(day))

        }
    }, [props.data.daily, props.day])

    return (
        <div className="Block">
            <div className="blockContent">
                <div className="col-1">
                    <div className="blockHeading">
                        <h2>{date}<sup>{dateEnding}</sup></h2>
                    </div>
                    <div className="left-image">
                        <img src={imageUrl}></img>
                    </div>
                </div>
                <div className="col-2">
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