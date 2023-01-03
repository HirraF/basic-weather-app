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
    }, [textInput])

    // Autocomplete
    useEffect(() => {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${textInput}&limit=5&appid=${process.env.REACT_APP_APP_KEY}`
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
                        {location.state ?
                            `${location.name}, ${location.state}, ${location.country}`
                            : `${location.name}, ${location.country}`}
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
        let searchBoxString = locationObj.state ? `${locationObj.name}, ${locationObj.state}, ${locationObj.country}`
            : `${locationObj.name}, ${locationObj.country}`;

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
            <div className="row">
                <div id="searchCol">
                    <input id="searchBox" type="text" name="location" autoComplete="off"
                        className={showResults ? "searchBoxResults" : "searchBoxNoResults"}
                        value={textInput} onChange={handleChange}
                    />
                    <div id="autocomplete">
                        {showResults && results}
                    </div>
                </div>
                <div id="submitCol">
                    <input type="submit" value="Submit" onClick={handleSubmit} />
                </div>
            </div>
        </form>
    )
}

export default Search;
