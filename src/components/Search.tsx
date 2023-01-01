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
    const [showResults, setShowResults] = useState(true);

    // Text Input
    function handleChange(e: FormEvent<HTMLInputElement>) {
        setShowResults(true);
        setLocationInput(e.currentTarget.value)
    }

    // Autocomplete
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
        console.log(e.currentTarget.getAttribute('data-key'));
        let locationKey = Number(e.currentTarget.getAttribute('data-key'));
        let locationObj = locationData[locationKey];
        let searchString = locationObj.name + ", " + locationObj.state + ", " + locationObj.country;
        setLocationInput(searchString);
        setShowResults(false);
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        props.setLocation(locationInput);
    }

    const results = createResults(locationData);

    return (
        <form>
            <input className="search" type="text" name="location" value={locationInput} onChange={handleChange} />
            <div className="autocomplete">
                {showResults && results}
            </div>
            <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
    )
}

export default Search;
