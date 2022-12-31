import { FormEvent, ReactFragment, SyntheticEvent } from "react";
import { useEffect, useState } from "react"
import { emptyLocation, parsedLocation, parseLocationData } from "../helpers/locationHelpers";


type SearchProps = {
    location: string
    setLocation: Function
}

function Search(props: SearchProps) {
    const [locationInput, setLocationInput] = useState('')
    const [locationData, setData] = useState<parsedLocation[]>(emptyLocation);

    function handleChange(e: FormEvent<HTMLInputElement>) {
        setLocationInput(e.currentTarget.value)
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        props.setLocation(locationInput);
    }

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&limit=5&appid=${process.env.REACT_APP_APP_KEY}`

    useEffect(() => {
        if (locationInput !== '') {
            fetch(url)
                .then(response => { return response.json() })
                .then(data => {
                    const parsedLocations = parseLocationData(data)
                    setData(parsedLocations)
                })
        }
        setData(emptyLocation)

    }, [locationInput])

    const createResults = (data: parsedLocation[]): ReactFragment | null => {
        if (data !== emptyLocation) {
            return (data.map(location =>
                <div> {location.name}, {location.state}, {location.country}</div>)
            );
        }
        return null;
    }

    const results = createResults(locationData);

    return (
        <form>
            <input type="text" name="location" onChange={handleChange} />
            <div className="autocomplete">
                {results}
            </div>
            <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
    )
}

export default Search;
