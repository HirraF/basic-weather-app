import { FormEvent, ReactFragment, SyntheticEvent } from "react";
import { useEffect, useState } from "react"
import { emptyLocation, parsedLocation, parseLocationData } from "../helpers/locationHelpers";


type SearchProps = {
    locationCoords: { lat: string, lon: string }
    setCoords: Function
}

function Search(props: SearchProps) {
    const emptyLocationArray = [emptyLocation]
    const [textInput, setTextInput] = useState('')
    const [locationData, setData] = useState<parsedLocation[]>(emptyLocationArray);
    const [chosenLocationData, setChosenData] = useState(emptyLocation)
    const [showResults, setShowResults] = useState(true);

    // Text Input
    function handleChange(e: FormEvent<HTMLInputElement>) {
        setShowResults(true);
        setTextInput(e.currentTarget.value)
    }
    useEffect(() => {
        if (textInput === '') {
            setShowResults(false);
        }
    })

    // Autocomplete
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${textInput}&limit=5&appid=${process.env.REACT_APP_APP_KEY}`
    useEffect(() => {
        if (textInput !== '') {
            fetch(url)
                .then(response => { return response.json() })
                .then(data => {
                    const parsedLocations = parseLocationData(data)
                    setData(parsedLocations)
                })
        }
        setData(emptyLocationArray);

    }, [textInput])

    const createResults = (data: parsedLocation[]): ReactFragment | null => {
        if (data !== emptyLocationArray) {
            return (data.map((location, index) =>
                <div key={index} data-key={index} onClick={handleListClick}>
                    <div className="autocompleteItems" >
                        {location.name}, {location.state}, {location.country}
                    </div>
                </div>
            ));
        }
        return null;
    }

    function handleListClick(e: SyntheticEvent) {
        e.preventDefault();
        let locationKey = Number(e.currentTarget.getAttribute('data-key'));
        let locationObj = locationData[locationKey];
        setChosenData(locationObj);
        let state = locationObj.state ? locationObj.state : '';   // handle null state
        let searchBoxString = locationObj.name + ", " + state + ", " + locationObj.country;
        setTextInput(searchBoxString);
       setShowResults(false);
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        let lat = chosenLocationData.lat;
        let lon = chosenLocationData.lon;
        props.setCoords({ lat: lat, lon: lon });
    }


    const results = createResults(locationData);
    return (
        <form>
            <input className="search" type="text" name="location" autoComplete="off" value={textInput} onChange={handleChange} />
            <div className="autocomplete">
                {showResults && results}
            </div>
            <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
    )
}

export default Search;
