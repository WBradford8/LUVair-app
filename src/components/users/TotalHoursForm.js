import React, { useState, useEffect } from "react"

export const TotalHoursForm = () => {
    
    
    const [flights, setFlights] = useState([])
    const [hoursFlown, updateHoursFlown] = useState({
        flightId: ""
    });
    // const [currentState, updateState] = useState(defaultValue)
    const fetchFlights = () => {
        return fetch("http://localhost:8088/flights")
            .then(res => res.json())
            .then((flightArray) => {
                    setFlights(flightArray)
                 })
    }
    useEffect(() => {
       fetchFlights()
   
    }, [])

    const saveHoursFlown = (event) => {
        event.preventDefault()
    }

    

    return (
        
        <div>
            <select
                onChange={
                        (evt) => {
                        const copy = {...hoursFlown}
                        copy.flightId = parseInt(evt.target.value)
                        updateHoursFlown(copy)
                            }}>
                {flights.map((flight) => {
                    return <option value={flight.id}> {flight.flightNumber} </option>
                })}
            </select>
        </div>
    )
}
