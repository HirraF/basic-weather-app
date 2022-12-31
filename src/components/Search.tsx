import { FormEvent, SyntheticEvent } from "react";
import { useState } from "react"


type SearchProps = {
    location: string
    setLocation: Function
}

function Search(props: SearchProps) {
    const [locationInput, setLocationInput] = useState('')

    function handleChange(e:FormEvent<HTMLInputElement>) {
        setLocationInput(e.currentTarget.value)
    }

    function handleSubmit(e: SyntheticEvent) {    
        e.preventDefault();
        props.setLocation(locationInput);
    }

    return (
        <form>
            <label>
                Location:
                <input type="text" name="location" onChange={handleChange}/>
            </label>
            <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
    )
}

export default Search;
