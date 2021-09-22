import React, { useState, useEffect } from "react"

export const TotalHoursForm = () => {
    
    
    const [flights, setFlights] = useState([])
    const [setFlight, updateFlight] = useState(
        {flightId:0}
    );
    // const [currentState, updateState] = useState(defaultValue)
    const userId = parseInt(localStorage.getItem("luvair_user"))
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

    const postFlights = (event) => {
        // event.preventDefault()
        const newPosts = {
            postTime: Date.now(),
            userId: userId,
            flightId: setFlight.flightId 
        }
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPosts)
        }
    
    
        return fetch(`http://localhost:8088/posts`, fetchOptions)
            .then(response => response.json())
            .then(() => {
               fetchFlights() 
            })
    }

   
    

    return (
        
        <div>
            <select 
            
                onChange={
                        (evt) => {
                        // updateFlight(parseInt(evt.target.value))
                        const copy = { ...setFlight };
                      copy.flightId = parseInt(evt.target.value);
                      updateFlight(copy);
                      postFlights()
                            }}>
                
                 <option value = "0"> Please select a Flight Number</option>
                {flights.map((flight) => {
                    return <option value={flight.id}> {flight.flightNumber} </option>
                })}
            </select>
            {/* <button
                onClick={

                }>
                SUBMIT
            </button> */}
        </div>
    )
}
