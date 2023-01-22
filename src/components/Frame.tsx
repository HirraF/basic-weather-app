import { useEffect, useState } from "react"
import Block from "./Block"
import MainBlock from "./MainBlock";

type FrameProps = {
    locationCoords: { lat: string, lon: string }
}

function Frame(props: FrameProps) {
    const lat = props.locationCoords.lat;
    const lon = props.locationCoords.lon;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_APP_KEY}&units=metric`

    const [data, setData] = useState({});

    useEffect(() => {
        fetch(url)
            .then(response => { return response.json() })
            .then(data => {
                setData(data)
            })
    }, [props.locationCoords])

    return (
        <div className="appFrame">
            <div id="todayCol">
                <MainBlock data={data} day={0} />
            </div>
            <div id="futureCol">
                <div id="blocksContainer">
                    <Block data={data} day={1} />
                    <Block data={data} day={2} />

                </div>
            </div>
        </div>
    );
}

export default Frame