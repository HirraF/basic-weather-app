import { useEffect, useState } from "react"
import Block from "./Block"

function Frame() {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=53.4808&lon=2.2426&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_APP_KEY}&units=metric`

    const [data, setData] = useState({});

    useEffect(() => {
        fetch(url)
            .then(response => { return response.json() })
            .then(data => {
                setData(data)
            })
    }, [])

    return (
        <div className="App-frame">
            <div className="col">
                <Block data={data} day={0} />
            </div>
            <div className="col">
                <Block data={data} day={1} />
            </div>
            <div className="col">
                <Block data={data} day={2} />
            </div>
        </div>
    );
}

export default Frame