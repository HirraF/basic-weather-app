
export interface parsedLocation {
    name: string
    state: string
    country: string
    lat: string
    lon: string
}

export const parseLocationData = (data: any): parsedLocation[] => {
    let parsedlocation = []
    for (let result of data) {
        let location: parsedLocation = {
            name: result.name,
            state: result.state || null,
            country: result.country,
            lat: result.lat,
            lon: result.lon
        }
        parsedlocation.push(location);
    }

    return parsedlocation
}

export const emptyLocation: parsedLocation[] = [
    {
        name: '',
        state: '',
        country: '',
        lat: '',
        lon: '',
    }
]