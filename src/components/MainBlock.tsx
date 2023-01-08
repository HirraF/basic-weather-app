import { useEffect, useState } from "react";
import { getDateParts, getDayEnding, getFullDate } from "../helpers/dateHelpers";

type BlockProps = {
    data: any
    day: number
}

function MainBlock(props: BlockProps) {

    const baseImageUrl = "http://openweathermap.org/img/wn/"

    const [temp, setTemp] = useState(0);
    const [maxTemp, setmaxTemp] = useState(0);
    const [minTemp, setminTemp] = useState(0);
    const [feelTemp, setFeelTemp] = useState(0);
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    // const [dateEnding, setDateEnding] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        if (props.data.daily) {
            const dayData: any = props.data.daily[props.day]
            setTemp(Math.trunc(dayData.temp.day));
            setmaxTemp(Math.trunc(dayData.temp.max));
            setminTemp(Math.trunc(dayData.temp.min));
            setFeelTemp(Math.trunc(dayData.feels_like.day));

            setDescription(dayData.weather[0].main)
            setImageUrl(baseImageUrl + dayData.weather[0].icon + "@4x.png")

            const fullDate = getFullDate(dayData.dt);
            setDate(fullDate)

        }
    }, [props.data.daily, props.day])

    return (
        <div className="MainBlock">

            <h1 className="mainBlockHeading" id="todayHeading">Today</h1>
            <h2 className="mainBlockHeading" id="fulldateHeading">{date}</h2>

            <div className="imageContentContainer">
                <div className="largeImage">
                    <img id="weatherIconLarge" src={imageUrl}></img>
                </div>

                <div className="tempContent">
                    <p>
                        <span id="largeTemp">{temp}</span>
                        <span id="largeUnit"> °C</span>
                    </p>
                    <p id="largeDescription">{description}</p>
                </div>
            </div>
            <div id="extraWeatherInfo">
                <p>
                    <span className="extraTemp" id="feelTemp">{feelTemp} °C</span>
                    <br />
                    <br />
                    <span className="extraTempDesc">Feels like</span>
                </p>

                <p>
                    <span className="extraTemp" id="maxTemp">{maxTemp} °C</span>
                    <br />
                    <br />
                    <span className="extraTempDesc">High</span>
                </p>
                <p>
                    <span className="extraTemp" id="minTemp">{minTemp} °C</span>
                    <br />
                    <br />
                    <span className="extraTempDesc">Low</span>
                </p>
            </div>
        </div>
    );
}

export default MainBlock